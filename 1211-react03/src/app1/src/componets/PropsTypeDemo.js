import React from 'react'
import PropTypes from 'prop-types'

export default class PropsTypeDemo extends React.Component {
   
    static propTypes = {
        // max: PropTypes.number
        max(props, propName, componentName) {
            // console.log(props, propName, componentName)
            let v = props[propName]
            if (v < 10 || v > 100) {
                throw new RangeError('max必须在10到100直接')
            }
        }
    }

    render() {
        // let max = this.props.max || 10
        return(
            <div>
                <h2>值-{this.props.max}</h2>
            </div>
        )
    }
}