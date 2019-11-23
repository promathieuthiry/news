import React, { Component } from "react"
import { Button } from "rsuite"

import { country } from "../helpers/country"
import sortHelper from "../helpers/sort"
import NavbarNews from "./navbar"

import DisplayQueryNews from "./display-query-news"

class TopHeadline extends Component {
  state = {
    data: [],
    isLoading: false,
    code: "us",
    nameCountry: "United States"
  }

  componentDidMount() {
    this.getNews()
  }

  getNews = async () => {
    this.setState({ isLoading: true })
    const { code } = this.state
    const indexCountry = country.findIndex(x => x.code === code)
    try {
      const dataFetching = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${process.env.REACT_APP_API_KEY_THE_NEWS_API}`
      )
      const news = await dataFetching.json()
      const datas = news.articles
      const data = datas.map(item => ({
        ...item,
        slug: item.title.replace(/\s+/g, "")
      }))
      this.setState({
        data,
        isLoading: false,
        nameCountry: country[indexCountry].name
      })
    } catch (error) {
      this.setState({ isLoading: false })
      throw error
    }
  }

  delete = (data, indexToDelete) => {
    data.splice(indexToDelete, 1)
    this.setState({ data })
  }

  onSelectCountry = async e => {
    const selectedCode = e.target.value
    await this.setState({ code: selectedCode })
    this.getNews()
  }

  sortDataHeadlineAsc = data => {
    data.sort(function(a, b) {
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
    })
    this.setState({ data })
  }

  sortDataHeadlineDesc = data => {
    data.sort(function(a, b) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    })
    this.setState({ data })
  }

  render() {
    const { data, isLoading, nameCountry } = this.state

    return (
      <div>
        <NavbarNews />

        {/* Card Search */}
        <div className="wrapperSearch">
          <div className="cardSearch">
            <h3 className="cardSearchTitle">Top news from {nameCountry}</h3>
            <select
              className="cardSearchInput"
              onChange={e => this.onSelectCountry(e)}
            >
              <option value="us" selected disabled hidden>
                United States
              </option>
              {country.sort(sortHelper.compare).map((item, key) => (
                <option key={key} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <div>
              <br />
              <Button
                className="buttonSort"
                appearance="subtle"
                onClick={() => this.sortDataHeadlineAsc(data)}
              >
                SortAsc
              </Button>
              <Button
                className=""
                appearance="subtle"
                onClick={() => this.sortDataHeadlineDesc(data)}
              >
                SortDesc
              </Button>
            </div>
          </div>
          {/* List Item */}
          {isLoading && (
            <Button className="loadingButton" appearance="link" loading>
              Link
            </Button>
          )}
          {data.map((item, index) => (
            <div>
              <DisplayQueryNews
                key={item.slug}
                dataQuery={data}
                data={item}
                delete={() => this.delete(data, index)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TopHeadline
