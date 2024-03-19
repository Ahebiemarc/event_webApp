import React from 'react'

import { Typography, Checkbox } from '@material-tailwind/react'


function Chekbox ({title, onChange, onBlur, checked, inputRef}){
  return (
    <div>
        <Checkbox className="checked:bg-blue"
        onChange={onChange}
        onBlur={onBlur}
        checked={checked}
        inputRef={inputRef}
            label={
              (
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-medium text-blue"
                >
                  {title}
                  
                </Typography>
              )
            }
            containerProps={{ className: "-ml-2.5" }}
          />
    </div>
  )
}

export default Chekbox