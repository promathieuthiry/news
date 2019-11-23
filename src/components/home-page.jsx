import React from "react"
import NavbarNews from "./navbar"
import QueryNews from "./queryNews"

function HomePage() {
  return (
    <div>
      <div className="Wrapper">
        <NavbarNews />
        <QueryNews />
      </div>
    </div>
  )
}

export default HomePage
