interface BookShelfConfig {
	theme: {
		[index: string]: {
			name: string;
			shelfFrameBackground: string;
			shelfDraggerBackground: string;
		};
	};
	parameters: {
		/** 30 vw */
		shelfMinWidth: number;
		shelfMaxWidth: number;
		/** 200 vh */
		shelfHeight: number;
		bookHeight: number;
		bookWidth: number;
	};
}

export function getBookShelfConfig() {
	const bookShelfConfig: BookShelfConfig = {
		theme: {
			steel: {
				name: '精钢',
				// TODO 添加图片
				shelfFrameBackground: `url(./black-wood.png),linear-gradient(
					#373737 290px,
					#000000 290px,
					#E8F8F2 292px,
					#000000 292px,
					#E8F8F2 298px,
					#000000 298px,
					#E8F8F2 300px
				)`,
				shelfDraggerBackground: '#373737',
			},
			brown: {
				name: '实木',
				// TODO 添加图片
				shelfFrameBackground: `url(./black-wood.png),linear-gradient(
					#373737 290px,
					#D2A94B 290px,
					#D2A94B 292px,
					#9A8548 292px,
					#9A8548 298px,
					#706A31 298px,
					#706A31 300px
				)`,
				shelfDraggerBackground: '#9A8548',
			},
			tech: {
				name: '科技',
				// TODO 添加图片
				shelfFrameBackground: `url(./black-wood.png),linear-gradient(
					#0a79e1 290px,
					#0a79e1 290px,
					#0a6ecb 292px,
					#0a6ecb 292px,
					#075cad 298px,
					#075cad 298px,
					#074b8a 300px
				)`,
				shelfDraggerBackground: '#0a79e1',
			},
			gov: {
				name: '党建',
				// TODO 添加图片
				shelfFrameBackground: `url(./black-wood.png),linear-gradient(
					#9c1313 290px,
					#FFD700 290px,
					#FFD700 292px,
					#9c1313 292px,
					#FFD700 298px,
					#9c1313 298px,
					#FFD700 300px
				)`,
				shelfDraggerBackground: '#9c1313',
			},
		},
		parameters: {
			/** 30 vw */
			shelfMinWidth: 30,
			shelfMaxWidth: 50,
			/** 200 vh */
			shelfHeight: 200,
			bookHeight: 280,
			bookWidth: 290,
		},
	};
	return bookShelfConfig;
}
