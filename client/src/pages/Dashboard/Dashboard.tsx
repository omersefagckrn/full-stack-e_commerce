import { Container, GrowBusiness, Info, ProductTable } from 'components';
import { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Container>
			<>
				<Info />
				<GrowBusiness />
				<ProductTable />
			</>
		</Container>
	);
};

export default Dashboard;
