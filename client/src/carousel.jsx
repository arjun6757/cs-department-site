import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
	const images = [
		{ src: "/images/beach.jpg", alt: "beach" },
		{ src: "images/bora-bora.jpg", alt: "bora" },
		{ src: "images/ocean.jpg", alt: "ocean" },
		{ src: "images/sunrise.jpg", alt: "sunrise" },
	];

	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		const timeoutId = setTimeout(() =>
				setImageIndex((prev) => {
					return (prev + 1) % images?.length;
				}),
			3000,
		);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [images, imageIndex]);

	function showNextImage() {
		setImageIndex((index) => {
			if (index === images.length - 1) {
				return 0;
			} else {
				return index + 1;
			}
		});
	}

	function showPrevImage() {
		setImageIndex((index) => {
			if (index === 0) {
				return images.length - 1;
			} else {
				return index - 1;
			}
		});
	}

	return (
		<div className="relative w-full h-[30vh] md:h-[400px] xl:h-[calc(100vh-4rem)] shadow-sm overflow-hidden">
			<div className="w-full h-full flex overflow-hidden relative">
				{images?.map((image, index) => {
					return (
						<img
							style={{ translate: `-${imageIndex * 100}%` }}
							className="transition-transform duration-300 sm:duration-500 w-full select-none h-full grow-0 shrink-0 object-cover object-center"
							key={image.src.toString()}
							src={image.src.toString()}
							alt={image.alt.toString()}
						/>
					);
				})}

				<div className="absolute bottom-5 left-5 border border-white px-4 py-2 bg-black/10 hidden sm:flex items-center text-sm text-white uppercase tracking-[0.5rem] font-light transition-all duration-500">
					{images[imageIndex]?.alt}
				</div>
			</div>

			<button
				onClick={() => {
					showPrevImage();
				}}
				className="absolute top-1/2 left-5 sm:left-10 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view previous image"
			>
				<ChevronLeft />
			</button>
			<button
				onClick={showNextImage}
				className="absolute top-1/2 right-5 sm:right-10 -translate-y-1/2  text-white p-2 rounded-full bg-black/30 sm:bg-transparent sm:hover:bg-black/30"
				aria-label="view next image"
			>
				<ChevronRight />
			</button>

			<div className="absolute bottom-0 sm:bottom-5 left-0 right-0 flex justify-center items-center gap-2 p-4">
				{images?.map((_, index) => (
					<button
						style={{
							background:
								index === imageIndex ? "white" : "transparent",
						}}
						className="rounded-full border border-white bg-transparent p-1"
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
