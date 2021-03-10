import React, { Component } from 'react'
import Article1 from './article1'
import Article2 from './article2'
import Article3 from './article3'
import Article4 from './article4'
import Article5 from './article5'

class Articles extends Component {

    render() {
        return (
            <div>
                <Article1 />
                <Article2 />
                <Article3 />
                <Article4 />
                <Article5 />

            </div>
        )
    }
}

//export Articles Component
export default Articles
