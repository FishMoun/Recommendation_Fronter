import React from 'react';
import MyHeader from '../Header';
import MyFooter from '../Footer';
import { Layout } from '@arco-design/web-react';
import { useRoutes } from 'react-router-dom';
import routes from '../../routes';
// import styles from './index.module.scss';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const MyLayout: React.FC = () => {
	const element = useRoutes(routes);
	return (
		<div>
			<Layout
				style={{
					height: 'calc(100vh)',
					overflow: 'hidden',
					position: 'relative'
				}}
			>
				<Header
					style={{
						height: '65px',
						position: 'fixed',
						left: '0',
						top: '0',
						right: '0'
					}}
				>
					<MyHeader />
				</Header>
				<Content
					style={{
						height: 'calc(100vh - 65px)',
						marginTop: '65px',
						overflowY: 'scroll'
					}}
				>
					<div style={{ padding: '0 40px', minHeight: 'calc(100vh - 65px)' }}>
						{element}
					</div>
					<MyFooter />
				</Content>
			</Layout>
		</div>
	);
};

export default MyLayout;
