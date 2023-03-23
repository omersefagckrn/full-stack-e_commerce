import { FC } from 'react';
import { LabelProps } from '../../types/components/utils/Label';

const Label: FC<LabelProps> = ({ label }) => {
	return (
		<label className='flex pt-4'>
			<div className='text-black text-xs font-medium'>{label}</div>
			<div className='text-redsoft text-xs font-medium'>*</div>
		</label>
	);
};

export default Label;
