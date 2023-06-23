import { Typography } from '@arco-design/web-react';

export const genEllipsis = (
	content?: string,
	rowNum?: number,
	myStyle?: React.CSSProperties
) => {
	if (!content) return '';
	return (
		<Typography.Text
			ellipsis={{ rows: rowNum || 1, showTooltip: true, wrapper: 'span' }}
			style={{ marginBottom: 0, ...myStyle }}
		>
			{content}
		</Typography.Text>
	);
};
