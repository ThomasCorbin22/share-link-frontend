import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
    render() {
        return (
            <div id='search' className='row mt-5 px-5 d-flex justify-content-between'>
                <Link to='./' className='link-url color-grey'>Links</Link>
                <Link id='addLink' to='./addLink' className='link-url color-grey'>Add Link</Link>
                <form className='d-flex align-items-center justify-content-end w-25 position-relative'>
                    <input className='w-100 rounded' type="text" name="search" onChange={this.props.onChange} value={this.props.value} />
                    <FontAwesomeIcon icon={faSearch} id='search-icon' className="position-absolute"/>
                </form>
            </div>
        )
    }
}