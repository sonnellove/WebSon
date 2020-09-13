import  {useState} from 'react'

export default (initialCount) => {
	const [count, setCount] = useState(initialCount);

	const dec = () => {
		setCount(initialCount)
	}

	return [count, dec]
}

