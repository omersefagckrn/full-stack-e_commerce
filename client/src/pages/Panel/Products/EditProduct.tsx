import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppToast } from 'helper/toast';
import { validationSchemaPanelEditProduct } from 'helper/validation';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editProduct, resetEditProduct } from 'redux/panel/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { EditProductProps, FormPanelEditProductValues } from 'types/pages/Panel/Products';

const EditProduct: FC<EditProductProps> = ({ product, visible, setVisible }) => {
	const [image, setImage] = useState<any>(product.image || '');
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const { isLoadingEditProduct, isSuccessEditProduct, errorMessageEditProduct, isErrorEditProduct } = useAppSelector((state) => state.panel.products);

	const onSubmit = async ({ name, price, category, countInStock, description, rating }: FormPanelEditProductValues) => {
		await appDispatch(editProduct({ id: product._id, name, price, category, countInStock, description, rating, image }));
	};

	useEffect(() => {
		if (isSuccessEditProduct) {
			AppToast({
				type: 'success',
				message: 'Product edited successfully'
			});
			appDispatch(resetEditProduct());
			setVisible(false);
			navigate(0);
		}

		if (isErrorEditProduct) {
			AppToast({
				type: 'error',
				message: errorMessageEditProduct
			});
			appDispatch(resetEditProduct());
		}
	}, [isSuccessEditProduct, errorMessageEditProduct, setVisible, appDispatch, navigate, isErrorEditProduct]);

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
				header='Edit your product'
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
						name: product.name,
						price: product.price,
						category: product.category,
						countInStock: product.countInStock,
						description: product.description,
						rating: product.rating
					}}
					validationSchema={validationSchemaPanelEditProduct}
					onSubmit={(values: FormPanelEditProductValues, { resetForm }) => {
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
								<Button disabled={isLoadingEditProduct} type='submit'>
									Update product
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default EditProduct;
