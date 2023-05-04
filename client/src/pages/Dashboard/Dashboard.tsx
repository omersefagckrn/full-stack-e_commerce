import { Container, GrowBusiness, Info, ProductView } from 'components';
import { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Container>
			<>
				<Info />
				<GrowBusiness />
				<ProductView />
			</>
		</Container>
	);
};

export default Dashboard;
