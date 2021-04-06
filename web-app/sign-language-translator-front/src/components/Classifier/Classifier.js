import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css';
import {Spinner, Button, Card} from 'react-bootstrap';
import axios from 'axios';

class Classifier extends Component {
    state = { 
        files: [],
        isLoading: false,
        userImage: null,
    }

    // componentDidMount() {
    //     this.getImages()
    // }

    // getImages = () => {
    //     axios.get('http://localhost:8000/api/images/', {
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     }).then(res=>{
    //         console.log(res)
    //     })
    // }

    onDrop = (files) => {
        this.setState({
            files: [],
            isLoading: true,
            userImage: null,
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false
            })
        }, 1000);
        // console.log('image loaded');
        // console.log(files);
    }

    sendImage = () => {
        let formData = new FormData();
        formData.append('image_field', this.state.files[0], this.state.files[0].name);
        axios.post('http://localhost:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log(res.data.id);
            this.getClass(res);
        })
        .catch(err=>{
            console.log('Error message: ' + err);
        })
    }

    getClass = (res_obj) => {
        this.setState({
            files:[]
        })
        axios.get('http://localhost:8000/api/images/'+res_obj.data.id+'/', {
            headers: {
                'accept': 'application/json',
            }
        })
        .then(res=>{
            console.log(res)
            this.setState({userImage:res})
        })
        .catch(err=>{
            console.log('Error message: ' + err)
        })

    }

    render() { 
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return ( 
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
            {({getRootProps, getInputProps}) => (
            <section className="container">
                <div {...getRootProps({className: 'dropzone back'})}>
                    <input {...getInputProps()} />
                    <i className="far fa-image mb-2 dropbox_text" style={{fontSize:100}}></i>
                    <p className='dropbox_text'>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    {files}
                </aside>

                {this.state.files.length > 0 &&
                <Button variant='dark' size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>
                }
                
                {this.state.isLoading &&
                <Spinner animation="grow" role="status"></Spinner>
                }

                {this.state.userImage &&
                <Card className='bg-light mx-auto' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text>
                        {this.state.userImage.data.classification}
                    </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={this.state.userImage.data.image_field} />
                </Card>
                }

            </section>
            )}
            </Dropzone>
        );
    }
}
 
export default Classifier;