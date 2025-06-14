# FITS Observatory

(Eventually) A high-performance, browser-based FITS file viewer and analysis tool built with Next.js, React, and a Rust/Wasm core for handling large astronomical data files.

This project aims to provide a fast, modern, and intuitive alternative to traditional desktop FITS viewers, with a focus on interactivity and performance directly in the web browser.


## Core Features

*   **In-Browser Parsing:** Reads and parses FITS files entirely on the client-side. No data is ever uploaded to a server.
*   **High-Performance Rendering:** Utilises the HTML Canvas API for rendering image data, with a planned upgrade to a Rust/Wasm engine for handling multi-gigabyte files.
*   **Interactive Data Analysis:** Features like dynamic contrast/brightness stretching, pixel value inspection, and histogram analysis are planned to make this a powerful tool for both enthusiasts and professionals.
*   **Modern Tech Stack:** Built with Next.js, TypeScript, and Tailwind CSS for a robust and maintainable codebase.

## Current Status

This project is currently in active development. The core FITS parsing engine has been successfully prototyped and is now being migrated into a full-featured Next.js application.

**Phase 1 (Complete):** Core engine for parsing FITS headers and data, and rendering a basic grayscale image to the canvas.

**Phase 2 (In Progress):** Development of the main application UI, interactive controls, and histogram analysis tools.

## Getting Started

To run this project locally, you'll need Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fits-observatory.git
    cd fits-observatory
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

This is an open-source project and contributions are welcome! If you have ideas for features or have found a bug, please feel free to open an issue.

## Licence

This project is licensed under the **MIT Licence**. See the `LICENSE` file for details.
