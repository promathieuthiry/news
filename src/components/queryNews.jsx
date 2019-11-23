import React, { Component } from "react"
import { Button } from "rsuite"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import DisplayQueryNews from "./display-query-news"

class QueryNews extends Component {
  state = {
    dataQuery: [],
    query: "",
    isLoading: false
  }

  onSubmit = async () => {
    this.setState({ isLoading: true })
    const { query } = this.state
    try {
      const dataFetching = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_API_KEY_THE_NEWS_API}`
      )
      const news = await dataFetching.json()
      const datas = news.articles
      const dataQuery = datas.map(item => ({
        ...item,
        slug: item.title.replace(/\s+/g, "")
      }))
      this.setState({ dataQuery, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false })
      throw error
    }
  }

  onHandleChange = event => {
    event.preventDefault()
    this.setState({ query: event.target.value })
  }

  delete = (dataQuery, indexToDelete) => {
    dataQuery.splice(indexToDelete, 1)
    this.setState({ dataQuery })
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.onSubmit()
    }
  }

  render() {
    const { dataQuery, query, isLoading } = this.state

    return (
      <div className="wrapperSearch">
        <div className="cardSearch">
          <h3 className="cardSearchTitle">Get the latest News</h3>
          <input
            className="cardSearchInput"
            placeholder="keyword or phrases"
            value={query}
            onChange={event => this.onHandleChange(event)}
            onKeyPress={this.handleKeyPress}
          />
          <button
            type="submit"
            className="cardSearchButton"
            onClick={this.onSubmit}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div>
          {isLoading && (
            <Button className="loadingButton" appearance="link" loading>
              Link
            </Button>
          )}
          {dataQuery.map((item, index) => (
            <div>
              <DisplayQueryNews
                key={item.slug}
                dataQuery={dataQuery}
                data={item}
                delete={() => this.delete(dataQuery, index)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default QueryNews
