import { FC } from 'react';
import { LabelProps } from 'types/components/Utils/Label';

const Label: FC<LabelProps> = ({ label }) => {
	return (
		<label className='text-gray_Five text-xs font-medium pt-4'>
			{label}
			<span className='text-redsoft'>*</span>
		</label>
	);
};

export default Label;
