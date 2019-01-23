import React, { Component } from 'react';

const transitionTime = 200;
const transitionStyle = `left ${transitionTime}ms, right ${transitionTime}ms`;

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: {}
    };
    this.els = {};
  }
  componentDidMount() {
    this.getSizes();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.children !== this.props.children &&
      prevProps.activeTab !== this.props.activeTab
    ) {
      this.getSizes();
    }
  }

  getSizes() {
    const rootBounds = this.root.getBoundingClientRect();

    const sizes = {};

    Object.keys(this.els).forEach(key => {
      const el = this.els[key];
      const bounds = el.getBoundingClientRect();

      const left = bounds.left - rootBounds.left;
      const right = rootBounds.right - bounds.right;

      sizes[key] = { left, right };
    });

    this.setState({ sizes });
    return sizes;
  }

  getUnderlineStyle() {
    if (
      this.props.activeTab == null ||
      Object.keys(this.state.sizes).length === 0
    ) {
      return { left: '0', right: '100%' };
    }

    const size = this.state.sizes[this.props.activeTab];

    return {
      left: `${size.left}px`,
      right: `${size.right}px`,
      transition: transitionStyle
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="dx_header__menu">
        <div className="dx_header__menu_tabs" ref={el => (this.root = el)}>
          {React.Children.map(this.props.children, (child, i) => {
            let className = `dx_header__menu_tabs_tab`;
            if (child.key === this.props.activeTab) {
              className = `${className} dx_header__menu_tabs_tab--active`;
            }
            return (
              <div
                className={className}
                onClick={() => {
                  this.props.onChange(child.key);
                }}
                ref={el => (this.els[child.key] = el)}
              >
                {child}
              </div>
            );
          })}
          <div
            className="dx_header__menu_tabs_underline"
            style={this.getUnderlineStyle()}
          />
        </div>
      </div>
    );
  }
}

export default TabBar;
