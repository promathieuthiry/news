import React, { Component } from 'react'
import { IconButton, Icon } from 'rsuite';
import './display-query-news.css'

 class DisplayQueryNews extends Component {
    render() {
        const { data, index, dataQuery } = this.props
        return (
            <div>
          <article className="card">
          <a className="card-targetLink" href={data.url} target="_blank" rel="noopener noreferrer">
            <img className="card-Image" src={data.urlToImage} alt={data.description} />
            <div className="card-content">
              <p className="card-source">{data.source.name}</p>
              <h2 className="card-title">{data.title}</h2>
              <p className="card-description">{data.description}</p>
              <p className="card-publication">Publié le {new Date(data.publishedAt).toLocaleString()}
              <IconButton className="buttonTrash" onClick={() => this.props.delete(dataQuery, index)} 
              size="sm" icon={<Icon icon="trash" />} />
              </p>
              </div>
            </a>
        </article>
          </div>

        )
    }
}

export default DisplayQueryNews