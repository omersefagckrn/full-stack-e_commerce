import { Carousel, Container, GrowBusiness, Info } from 'components';
import { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Container>
			<div>
				<Info />
				<GrowBusiness />
				<Carousel />
			</div>
		</Container>
	);
};

export default Dashboard;
