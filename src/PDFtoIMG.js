import { Component } from 'react';
import PDFJS from 'pdfjs-dist/webpack';

class PDFtoIMG extends Component {
    state = {
        pages: []
    }

    componentDidMount() {
        fetch(this.props.file)
        .then(data => data.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                PDFJS.getDocument(reader.result)
                .promise.then( pdf => {
                    const pages = [];
                    this.pdf = pdf;
                    for (let i=0; i<this.pdf.numPages; i++) {
                        pages.push(this.getPage(i+1));                      
                    }
                    Promise.all(pages)
                    .then(pages=>{
                        console.log(PDFJS);
                        this.setState({pages});
                    })
                })
            }
        });
    }

    getPage = (num) => {
        return new Promise((resolve, reject) => {
            this.pdf.getPage(num).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport(scale);
                const canvas = document.createElement('canvas');
                const canvasContext = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({
                    canvasContext, viewport
                })
                .promise.then(() => {
                    resolve(canvas.toDataURL('image/jpeg'));
                })
            })    
        })
    }

    render() {
        return this.props.children({pages: this.state.pages});
    }
  }

  export default PDFtoIMG;