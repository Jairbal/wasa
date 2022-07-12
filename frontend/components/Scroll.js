import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class ScrollToo extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scroll }) => (
          <a onClick={() => scroll({ x: 20, y: 500 })}>Scroll to Bottom</a>
        )}
      </ScrollTo>
    );
  }
}