import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
type ArticleParamsFormProps = {
	onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setState] = useState(defaultArticleState);
	const sideBar = useRef<HTMLElement>(null);

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		onApply(formState);
	};
	const handleReset = (e: React.FormEvent): void => {
		e.preventDefault();
		onApply(defaultArticleState);
		setState(defaultArticleState);
	};

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			if (sideBar.current && !sideBar.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={sideBar}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title={'шрифт'}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'рАЗМЕР шрифта'}
						name={'ni'}
						onChange={(value) =>
							setState({ ...formState, fontSizeOption: value })
						}
					/>
					<Select
						options={fontColors}
						title={'Цвет шрифта'}
						selected={formState.fontColor}
						onChange={(value) => setState({ ...formState, fontColor: value })}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title={'Цвет фона'}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						options={contentWidthArr}
						title={'Ширина контента'}
						selected={formState.contentWidth}
						onChange={(value) =>
							setState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
