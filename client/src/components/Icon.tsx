import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { FC } from 'react'

type IconProps = {
    MyIcon: new () => React.Component<any, any>
    text: string
}

const Icon: FC<IconProps> = ({ MyIcon, text }) => {
    return (
        <ReactTooltip content='text'>
            <MyIcon />
        </ReactTooltip>
    )
}

export default Icon
