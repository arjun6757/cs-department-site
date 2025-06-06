import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

export default function Carousel({ images }) {
	const [imageIndex, setImageIndex] = useState(1);
	const [jump, setJump] = useState(false);
	const [transitioning, setTransitioning] = useState(false);

	const slides = [images[images.length - 1], ...images, images[0]];

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			showNextImage();
		}, 5000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [imageIndex]);

	function showNextImage() {
		if (transitioning) return;

		if (imageIndex === 1 && jump) {
			setJump(false);
		}

		if (imageIndex === slides.length - 2 && jump) {
			setJump(false);
		}

		setImageIndex((index) => {
			if (index === slides.length - 1) {
				return 1;
			}
			return index + 1;
		});
	}

	function showPrevImage() {
		if (transitioning) return;

		if (imageIndex === 1 && jump) {
			setJump(false);
		}

		if (imageIndex === slides.length - 2 && jump) {
			setJump(false);
		}

		setImageIndex((index) => {
			if (index === 0) {
				return slides.length - 2;
			}
			return index - 1;
		});
	}

	return (
		<div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[400px] lg:w-[960px] xl:w-[1200px] lg:h-[320px] lg:mx-auto lg:mt-8 lg:rounded xl:border xl:border-[#ddd] lg:shadow-lg shadow-sm overflow-hidden">
			<div
				style={{
					transform: `translate3d(-${imageIndex * 100}%, 0, 0)`,
					willChange: "transform",
				}}
				onTransitionStart={() => {
					setTransitioning(true);
				}}
				onTransitionEnd={() => {
					if (imageIndex === slides.length - 1) {
						setJump(true);
						setImageIndex(1);
					} else if (imageIndex === 0) {
						setJump(true);
						setImageIndex(slides.length - 2);
					}

					setTransitioning(false);
				}}
				data-jump={jump}
				className={`w-full h-full data-[jump=true]:transition-none
				 data-[jump=false]:transition-transform duration-300 ease-in-out sm:duration-500 md:duration-700 lg:duration-1000 flex relative`}
			>
				{slides?.map((image, index) => {
					return (
						<img
							decoding="async"
							loading="lazy"
							className="w-full h-[30vh] sm:h-[40vh] md:h-[400px] lg:w-[960px] xl:w-[1200px] lg:h-[320px] select-none shrink-0 grow-0 object-cover object-center"
							key={`${image.src.toString()}-${index}`}
							src={image.src.toString()}
							alt={image.alt.toString()}
						/>
					);
				})}
			</div>

			<button
				disabled={transitioning}
				onClick={showPrevImage}
				className="absolute disabled:opacity-50 top-1/2 left-5 sm:left-10 -translate-y-1/2 text-white p-2 rounded-full outline-none border-none focus:ring-2 bg-black/20 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view previous image"
			>
				<ChevronLeft />
			</button>
			<button
				disabled={transitioning}
				onClick={showNextImage}
				className="absolute disabled:opacity-50 top-1/2 right-5 sm:right-10 -translate-y-1/2  text-white p-2 rounded-full outline-none border-none focus:ring-2 bg-black/20 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view next image"
			>
				<ChevronRight />
			</button>

			<div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 p-4">
				{[1, 2, 3].map((index) => (
					<button
						data-jump={jump}
						data-active={index === imageIndex}
						style={{
							willChange: "transform",
						}}
						className="w-1 h-2 sm:w-3 sm:h-3 data-[active=true]:scale-110 data-[active=true]:shadow-md data-[active=false]:shadow-none data-[active=false]:scale-100 data-[jump=true]:transition-none data-[jump=false]:transition-transform duration-300 ease-in-out sm:duration-500 md:duration-700 lg:duration-1000 rounded-full border border-white outline-none focus:ring-2 data-[active=true]:bg-white data-[active=false]:bg-transparent p-1"
						key={index}
						onClick={() => {
							setImageIndex(index);
						}}
						aria-label={`view image ${index}`}
					></button>
				))}
			</div>
		</div>
	);
}
