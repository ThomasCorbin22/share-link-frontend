import React from 'react'
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'

export default class AddLink extends React.Component {
    render() {
        const displayTags = this.props.input.tags.map((tag, index) => (
            <label key={index} id={'tag-' + String(index)} className='d-flex justify-content-between color-white'>
                {'Tag: '}
                <input className='color-white rounded w-75 bg-grey' type="text" name='tag' value={tag.name} onChange={this.props.handleForm} />
            </label>
        ));

        return (
            <div>
                <div id='title' className='row mb-3 px-5'>
                    <h2 className='color-white'>Add a new link to #React</h2>
                </div>

                <Card className='w-50 bg-dark'>
                    <CardHeader className='color-white'>Add Link</CardHeader>
                    <form onSubmit={this.handleSubmit}>
                        <CardBody className='d-flex flex-column justify-content-around color-white'>
                            <label className='d-flex justify-content-between'>
                                {'Name: '}
                                <input className='color-white rounded w-75 bg-grey' type="text" name='name' value={this.props.input.name} onChange={this.props.handleForm} />
                            </label>
                            <label className='d-flex justify-content-between'>
                                {'URL: '}
                                <input className='color-white rounded w-75 bg-grey' type="text" name='url' value={this.props.input.url} onChange={this.props.handleForm} />
                            </label>
                            {displayTags}
                            <Button color="secondary" onClick={this.props.addTag}>Add Tag</Button>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" color="secondary" onClick={this.props.submitForm}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.props.redirect}>Cancel</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        );
    }
}