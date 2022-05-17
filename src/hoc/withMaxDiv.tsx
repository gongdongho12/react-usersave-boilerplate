/* eslint-disable @typescript-eslint/ban-types */
import React, { ComponentType, FunctionComponent } from 'react'
import FlexCenter from 'components/FlexCenter'
import useMeasure from 'react-use-measure'
import { useDebounce } from 'use-debounce';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withMaxDiv = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const MaxDivComp: FunctionComponent<P> = (props: P) => {
    const [ref, bounds] = useMeasure()
    const [updateBounds] = useDebounce(bounds, 1000)
    return <FlexCenter ref={ref} style={{ height: '100%', width: '100%' }}>
      <WrappedComponent {...props} bounds={updateBounds} />
    </FlexCenter>
  }
  const hocComponent = (hocProps: P) => {
    return <MaxDivComp {...hocProps} />
  }
  return hocComponent;
}

export default withMaxDiv;
