# react-pdf-to-image

A a render prop component wrapper around [pdf.js](https://github.com/mozilla/pdf.js) that asynchronously converts PDF files into data URLs in the browser.

## Example Usage

```
import React from 'react';
import {PDFtoIMG} from 'react-pdf-to-image';
import file from './pdf-sample.pdf';

const App = () =>
    <div>
        <PDFtoIMG file={file}>
            {({pages}) => {
                if (!pages.length) return 'Loading...';
                return pages.map((page, index)=>
                    <img key={index} src={page}/>
                );
            }}
        </PDFtoIMG>
    </div>

export default App;

```

## Issues
- Relies on the [pdf.js distribution from Mozilla](https://github.com/mozilla/pdf.js) which uses a web worker. Currently in order to get this working the `pdfjs-dist/build/pdf.worker.js` file must be included in your projects build foldler and does not work in Webpack while running in development mode.

- Not optimized for loading very large multi-page PDFs and works best when used to convert simple single page documents to Image URLs

- POC atm so there's no tests or error handling.