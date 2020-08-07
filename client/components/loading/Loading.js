import React from 'react'
import {SequenceSpinner} from 'react-spinners-kit' //import react spinners kit

const Loading = function(props) {
  return (
    <div className="sequence-spinner">
      <SequenceSpinner
        size={60}
        backColor="#2a9d8f"
        frontColor="#264653"
        loading={props.loading}
      />
    </div>
  )
}

export default Loading
