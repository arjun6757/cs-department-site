import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ images }) {

	const [imageIndex, setImageIndex] = useState(0);
	const [isSliding, SetIsSliding] = useState(false);

	useEffect(() => {
		if (!isSliding) return;

		const id = setTimeout(() => {
			SetIsSliding(false);
		}, 1000);

		return () => clearTimeout(id)

	}, [isSliding])

	useEffect(() => {
		const timeoutId = setTimeout(() =>
			setImageIndex(p => {
				return (p + 1) % images.length;
			}),
			4000,
		);

		return () => {
			clearTimeout(timeoutId);
		};

	}, [images, imageIndex]);

	function showNextImage() {
		if (isSliding) return;

		SetIsSliding(true);

		setImageIndex((index) => {
			if (index === images.length - 1) {
				return 0;
			} else {
				return index + 1;
			}
		});
	}

	function showPrevImage() {
		if (isSliding) return;

		SetIsSliding(true);
		
		setImageIndex((index) => {
			if (index === 0) {
				return images.length - 1;
			} else {
				return index - 1;
			}
		});

	}

	return (
		<div className="relative w-full h-[30vh] md:h-[400px] lg:h-[320px] shadow-sm overflow-hidden">
			<div
				style={{
					transform: `translate3d(-${imageIndex * 100}%, 0, 0)`,
					willChange: "transform"
				}}
				className={`w-full h-full flex transition-transform duration-300 sm:duration-1000 relative`}>
				{images?.map((image) => {
					return (
						<img
							decoding="async"
							loading="lazy"
							className="w-full select-none h-full shrink-0 object-cover object-center"
							key={image.src.toString()}
							src={image.src.toString()}
							alt={image.alt.toString()}
						/>
					);
				})}
			</div>


			<button
				disabled={isSliding}
				onClick={showPrevImage}
				className="absolute disabled:opacity-50 top-1/2 left-5 sm:left-10 -translate-y-1/2 text-white p-2 rounded-full outline-none border-none focus:ring-2 bg-black/20 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view previous image"
			>
				<ChevronLeft />
			</button>
			<button
				disabled={isSliding}
				onClick={showNextImage}
				className="absolute disabled:opacity-50 top-1/2 right-5 sm:right-10 -translate-y-1/2  text-white p-2 rounded-full outline-none border-none focus:ring-2 bg-black/20 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view next image"
			>
				<ChevronRight />
			</button>

			<div className="absolute bottom-0 sm:bottom-5 left-0 right-0 flex justify-center items-center gap-2 p-4">
				{images?.map((_, index) => (
					<button
						data-active={index === imageIndex}
						style={{
							background:
								index === imageIndex ? "white" : "transparent",
						}}
						className="w-1 data-[active=true]:scale-110 data-[active=true]:shadow-md data-[active=false]:shadow-none data-[active=false]:scale-100 transition-transform duration-300 ease-in-out rounded-full border border-white outline-none focus:ring-2 bg-transparent p-1"
						key={index}
						onClick={() => {
							setImageIndex(index);
						}}
						aria-label={`view image ${index + 1}`}
					></button>
				))}
			</div>
		</div>
	);
}
