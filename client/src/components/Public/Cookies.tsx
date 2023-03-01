import CookiesIcon from 'assets/icons/cookies.svg';
import { Dialog } from 'primereact/dialog';
import { FC, useState } from 'react';

const Cookies: FC = () => {
	const [modal, setModal] = useState<boolean>(false);

	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);
	return (
		<>
			<div className='fixed bottom-0 left-0 z-[1000] mx-6 my-6 cursor-pointer rounded-[50%] flex items-center justify-center bg-[#979797] w-15 h-15'>
				<img onClick={openModal} className='w-14 h-14' src={CookiesIcon} alt='' />
			</div>
			<Dialog
				position='top'
				maximizable={window.outerWidth > 775 ? false : true}
				header='Customize Consent Preferences'
				visible={modal}
				className='w-full lg:max-w-[774px]'
				onHide={closeModal}
				draggable={false}
			>
				<div>
					<div className='h-full max-h-[55vh]'>
						<div className='text-xs'>
							We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all
							cookies under each consent category below.The cookies that are categorized as 'Necessary' are stored on your browser as they are
							essential for enabling the basic functionalities of the site.We also use third-party cookies that help us analyze how you use this
							website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be
							stored in your browser with your prior consent.You can choose to enable or disable some or all of these cookies but disabling some
							of them may affect your browsing experience.
						</div>

						<div className='h-[0.5px] bg-[#ABAEB3] my-8' />
						<div className='flex flex-col select-none'>
							<div className='flex items-center justify-between mb-4'>
								<div className='text-black font-semibold'>Required</div>
								<div className='py-1 px-1 text-[#666DF1] text-xs font-medium text-center rounded-full border border-[#666DF1]'>
									Always Active
								</div>
							</div>
							<div className='text-xs'>
								These cookies are necessary to enable the basic features of this site to function, such as providing secure log-in or
								remembering how far you are through an order.
							</div>
						</div>
						<div className='h-[0.5px] bg-[#ABAEB3] my-8' />
						<div className='flex flex-col select-none'>
							<div className='flex items-center justify-between mb-4'>
								<div className='text-black font-semibold'>Functional</div>
							</div>
							<div className='text-xs'>
								These cookies allow us to analyze your use of the site to evaluate and improve our performance. They may also be used to
								provide a better customer experience on this site. For example, remembering your log-in details and providing us
								information about how our site is used.
							</div>
						</div>
						<div className='h-[0.5px] bg-[#ABAEB3] my-8' />
						<div className='flex flex-col select-none'>
							<div className='flex items-center justify-between mb-4'>
								<div className='text-black font-semibold'>Analytics</div>
								<div className='py-1 px-1 text-[#666DF1] text-xs font-medium text-center rounded-full border border-[#666DF1]'>
									Always Active
								</div>
							</div>
							<div className='text-xs'>
								These cookies help to better understand and analyze usage behavior and to improve the functionality of the site.
								Analysis cookies enable the collection of usage and recognition options by first or third-party providers, in so-called
								pseudonymous usage profiles. A direct inference to a person is not possible.
							</div>
						</div>
						<div className='h-[0.5px] bg-[#ABAEB3] my-8' />
						<div className='flex flex-col select-none pb-[40px]'>
							<div className='flex items-center justify-between mb-4'>
								<div className='text-black font-semibold'>Advertising</div>
							</div>
							<div className='text-xs'>
								These cookies are used to show you ads that are more relevant to you. We may share this information with advertisers or
								use it to better understand your interests. For example, Advertising Cookies may be used to share data with advertisers
								so that the ads you see are more relevant to you, allow you to share certain pages with social networks, or allow you to
								post comments on our site.
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default Cookies;
