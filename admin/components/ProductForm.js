import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
	_id,
	title: titleProp,
	description: descriptionProp,
	price: priceProp
                                    }) {
	const [title, setTitle] = useState(titleProp || '')
	const [description, setDescription] = useState(descriptionProp || '')
	const [price, setPrice] = useState(priceProp || '')
	const [goToProducts, setGoToProducts] = useState(false)
	const router = useRouter()

	const createProduct = async (ev) => {
		ev.preventDefault()
		const data = {_id, title, description, price}
		if (_id) {
			await axios.put('/api/products', {...data, _id})
		} else {
			await axios.post('/api/products', data)
		}

		setGoToProducts(true)

	}

	if (goToProducts) {
		router.push('/products')
	}

	return (
		<form onSubmit={createProduct}>
			<label htmlFor="">Product name</label>
			<input
				type="text"
				placeholder={'product name'}
				value={title}
				onChange={ev => setTitle(ev.target.value)}
			/>
			<label htmlFor="">Description</label>
			<textarea
				placeholder={'description'}
				value={description}
				onChange={ev => setDescription(ev.target.value)}
			/>

			<label htmlFor="">Price (in USD)</label>
			<input
				type="number"
				placeholder={'price'}
				value={price}
				onChange={ev => setPrice(ev.target.value)}
			/>
			<button type={"submit"} className={'btn-primary'}>Save</button>
		</form>
	)
}