import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppToast } from 'helper/toast';
import { validationSchemaPanelAddProduct } from 'helper/validation';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, resetCreateProduct } from 'redux/panel/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { AddProductProps, FormPanelAddProductValues } from 'types/pages/Panel/Products';

const AddProduct: FC<AddProductProps> = ({ visible, setVisible }) => {
	const [image, setImage] = useState<any>('');
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoadingCreateProduct, isErrorCreateProduct, isSuccessCreateProduct, errorMessageCreateProduct } = useAppSelector((state) => state.panel.products);

	const onSubmit = async ({ name, price, category, countInStock, description, rating }: FormPanelAddProductValues) => {
		if (!image) {
			return AppToast({
				type: 'error',
				message: 'Please upload an image'
			});
		} else {
			await appDispatch(
				createProduct({
					name,
					price,
					category,
					countInStock,
					description,
					rating,
					image
				})
			);
		}
	};

	useEffect(() => {
		if (isSuccessCreateProduct) {
			AppToast({
				type: 'success',
				message: 'Product created successfully'
			});
			appDispatch(resetCreateProduct());

			setVisible(false);
			navigate(0);
		}

		if (isErrorCreateProduct) {
			AppToast({
				type: 'error',
				message: errorMessageCreateProduct
			});
		}
	}, [isSuccessCreateProduct, isErrorCreateProduct, errorMessageCreateProduct, appDispatch, setVisible, navigate]);

	const customBase64Uploader = async (event: any) => {
		const file = event.files[0];
		const reader = new FileReader();
		let blob = await fetch(file.objectURL).then((r) => r.blob());
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			setImage(reader.result);
		};
	};

	return (
		<>
			<Dialog
				className='w-full lg:max-w-[774px]'
				draggable={false}
				maximizable={window.outerWidth > 775 ? false : true}
				header='Add New Product'
				visible={visible}
				onHide={() => setVisible(false)}
				headerStyle={{
					paddingBottom: '0rem'
				}}
			>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{
						name: '',
						price: 0,
						category: '',
						countInStock: 0,
						description: '',
						rating: 0
					}}
					validationSchema={validationSchemaPanelAddProduct}
					onSubmit={(values: FormPanelAddProductValues, { resetForm }) => {
						resetForm();
						onSubmit(values);
					}}
				>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
							<Label label='Name' />
							<Input placeholder='Name' id='name' value={values.name} onChange={handleChange} />
							<Error error={errors.name} />

							<Label label='Price' />
							<Input placeholder='Price' id='price' value={values.price.toString()} onChange={handleChange} />
							<Error error={errors.price} />

							<Label label='Category' />
							<Input placeholder='Category' id='category' value={values.category} onChange={handleChange} />
							<Error error={errors.category} />

							<Label label='Count In Stock' />
							<Input placeholder='Stock' id='countInStock' value={values.countInStock.toString()} onChange={handleChange} />
							<Error error={errors.countInStock} />

							<Label label='Description' />
							<Input placeholder='Description' id='description' value={values.description} onChange={handleChange} />
							<Error error={errors.description} />

							<Label label='Rating' />
							<Input placeholder='Rating' id='rating' value={values.rating.toString()} onChange={handleChange} />
							<Error error={errors.rating} />

							<Label label='Image' />
							<FileUpload
								customUpload
								uploadHandler={customBase64Uploader}
								mode='advanced'
								accept='image/*'
								chooseLabel='Product Image'
								multiple={false}
							/>

							<div className='pt-4 flex flex-col'>
								<Button disabled={isLoadingCreateProduct} type='submit'>
									Add new product
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default AddProduct;
