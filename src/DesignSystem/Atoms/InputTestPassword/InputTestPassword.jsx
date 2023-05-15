import { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';

const  InputTestPassword = ()=>{
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (val) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 200);
    }
  };
  return (
    <Autocomplete
      value={value}
      data={data}
      name="email"
      required
      type="email"
      onChange={handleChange}
      rightSection={loading ? <Loader size="10" /> : null}
      label="Email"
      placeholder="regis.grumberg@Sportizer.com"
    />
  );
}

export default InputTestPassword