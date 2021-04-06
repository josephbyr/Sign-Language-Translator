import React, { Component } from 'react';
import axios from 'axios';
import {Card} from 'react-bootstrap';


class ClassificationHistory extends Component {
    state = {
        images: [],
    }

    componentDidMount() {
        this.getImages()
    }

    getImages = () => {
        axios.get('http://localhost:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(res=>{
            this.setState({images: res.data})
            console.log(res)
        })
    }

    render() {
        const images = this.state.images.map(image => {
            return ( 
                <Card key={image.id} className='bg-light mx-auto mb-3' style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            {image.classification}
                        </Card.Text>
                    </Card.Body>
                    <Card.Img variant="bottom" src={image.image_field} />
                </Card>
            );
        })
        return (
            <div>
            <h1>Classification History</h1>
            {this.state.images.length === 0 &&
            <h2>No history available</h2>
            }
            {images}
            </div>
        );
    }
}
 
export default ClassificationHistory;