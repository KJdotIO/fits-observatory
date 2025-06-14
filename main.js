function parseCard(str) {
    if (str.includes('=')) {
        splitStr = str.split('=')

        const cardKey = splitStr[0].trim()
        let cardVal = splitStr[1].split('/')[0].trim()
        if (cardVal == 'T') {
            cardVal = true
        } else if (cardVal == 'F') {
            cardVal = false
        } else if (cardVal.startsWith("'") && cardVal.endsWith("'")) {
            cardVal = cardVal.slice(1, -1).trim()
        } else if (!isNaN(Number(cardVal))) {
            cardVal = Number(cardVal)
        }

        return { key: cardKey, value: cardVal }
    }
}

function dropHandler(event) {
    const files = [...event.dataTransfer.items]
    console.log("Dropped file!")
    event.preventDefault()

    const file = files[0].getAsFile()
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'))
    if (fileExtension == '.fits' | fileExtension == '.fit' | fileExtension == '.fts') {
        file.arrayBuffer().then(arrBuffer => {
            console.log('Successfully grabbed bytes!', arrBuffer.byteLength)
            fileBuffer = new DataView(arrBuffer)
            let byteOffset = 0
            const headerObjects = new Object()

            while (true) {
                let cardString = ""

                for (let i = 0; i < 80; i++) {
                    const currentBytePos = byteOffset + i
                    const charCode = fileBuffer.getUint8(currentBytePos)
                    const charStr = String.fromCharCode(charCode)
                    cardString += charStr
                }

                if (cardString.startsWith('END')) {
                    break
                }
                const parsedCard = parseCard(cardString)
                if (parsedCard != undefined) {
                    headerObjects[parsedCard.key] = parsedCard.value
                }
                byteOffset += 80
            }

            const numHeaderBlocks = Math.ceil((byteOffset + 80) / 2880)
            const offsetPosition = numHeaderBlocks * 2880
            const bitpix = headerObjects.BITPIX
            const totalPixels = headerObjects.NAXIS1 * headerObjects.NAXIS2 * headerObjects.NAXIS3
            const pixelData = []

            for (let i = 0; i < totalPixels; i++) {
                const pixelOffset = offsetPosition + (i * 4)
                const pixelValue = fileBuffer.getFloat32(pixelOffset)
                pixelData.push(pixelValue)
            }
            const minVal = Math.min(...pixelData)
            const maxVal = Math.max(...pixelData)
            const canvasToPaint = document.getElementById('canvas')
            const canvasWidth = canvasToPaint.width = headerObjects.NAXIS1
            const canvasHeight = canvasToPaint.height = headerObjects.NAXIS2
            const ctx = canvasToPaint.getContext('2d')
            const imageData = ctx.createImageData(canvasWidth, canvasHeight)

            console.log(canvasToPaint, canvasWidth, canvasHeight, imageData)

            for (let i = 0; i < (headerObjects.NAXIS1 * headerObjects.NAXIS2); i++) {
                const pixelValue = pixelData[i]
                const greyValue = ((pixelValue - minVal) / (maxVal - minVal)) * 255

                imageData.data[i * 4] = greyValue; //red
                imageData.data[i * 4 + 1] = greyValue; //green
                imageData.data[i * 4 + 2] = greyValue; //blue
                imageData.data[i * 4 + 3] = 255; //alpha
            }

            ctx.putImageData(imageData, 0, 0)

            console.log(
                pixelData,
                minVal,
                maxVal
                // headerObjects,
                // byteOffset,
                // offsetPosition,
                // bitpix,
                // totalPixels
            )
        }).catch(error => {
            console.log('Couldnt grab bytes', error)
        })
    } else {
        console.log('This is not a FITS file. Please upload one!')
        return
    }
}

function dragoverHandler(event) {
    console.log('Dragging over stuff')
    event.preventDefault()
}