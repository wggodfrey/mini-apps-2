import React from 'react'

const ResponsiveWrapper = ChartComponent => (
  class ResponsiveChart extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      this.fitParentContainer()
      window.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth } = this.state
      const currentContainerWidth = this.chartContainer
        .getBoundingClientRect().width

      const shouldResize = containerWidth !== currentContainerWidth

      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
        })
      }
    }

    renderChart() {
      const parentWidth = this.state.containerWidth

      return (
        <ChartComponent {...this.props} parentWidth={parentWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref={(el) => { this.chartContainer = el }}
          className="responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)

export default ResponsiveWrapper;