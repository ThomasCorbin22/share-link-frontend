import React from 'react'
import LinkCard from './LinkCard'

export default class LinkList extends React.Component {
    render() {
        let itemList = this.props.links.map((link) => {
            return <LinkCard key={link.name} name={link.name} url={link.url} tags={link.tags.map((tag) => tag.name).join(' ')} />
        });

        return (
            <>
                <div id='title' className='row mb-3 px-5'>
                    <h2 className='color-white'>Links for #React</h2>
                </div>
                <div id='links' className='row px-5'>
                    {itemList}
                </div>
            </>
        )
    }
}