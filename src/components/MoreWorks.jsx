import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Local Icon Definitions (Reintroduced FaRegPlayCircle) ---
const Icon = ({ children, className = '', style }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className} 
        style={style}
    >
        {children}
    </svg>
);

const FaRegPlayCircle = ({ className = '', style }) => (
    <Icon className={className} style={style}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></Icon>
);

// Note: Other unused icons (FaInstagram, FaLinkedin, etc.) are omitted for brevity in this response, 
// but you should keep them or remove them based on where else they are used in your actual project.
// The main component no longer uses them.


// --- Custom CountUp Component (Replaced react-countup) ---
const CustomCountUp = ({ end, duration = 3, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!inView) return;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / (duration * 1000));
            const newCount = Math.floor(progress * end);
            setCount(newCount);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(step);
    }, [end, duration, inView]);

    return <span ref={ref}>{count}{suffix}</span>;
};


// --- Configuration & Explicit Video Data ---

const PRIMARY_COLOR = '#0f9cf8';
const SECONDARY_TEXT_COLOR = 'rgb(147 197 253)'; // blue-300 equivalent

const createMockVideo = (client, title, isVertical) => {
    const mockId = title.replace(/\s/g, '').toLowerCase() + Math.floor(Math.random() * 999);
    const placeholderSize = isVertical ? '300x533' : '533x300';
    return {
        client: client,
        title: title,
        link: `https://www.youtube.com/embed/${mockId}`,
        thumbnail: `https://placehold.co/${placeholderSize}/1f2937/FFFFFF?text=${title.replace(/\s/g, '+')}`,
    };
};

const shortFormVideosData = [
    { client: 'Focas', title: 'Short Video 1', link: 'https://www.youtube.com/embed/-_qW-CYaJSs', thumbnail: 'https://img.youtube.com/vi/-_qW-CYaJSs/maxresdefault.jpg' },
    { client: 'Focas', title: 'Short Video 2', link: 'https://www.youtube.com/embed/HhFQOmu5UBM', thumbnail: 'https://img.youtube.com/vi/HhFQOmu5UBM/maxresdefault.jpg' },
    { client: 'Santu', title: 'Short Video 3', link: 'https://www.youtube.com/embed/HYSrpkh-H4M', thumbnail: 'https://img.youtube.com/vi/HYSrpkh-H4M/maxresdefault.jpg' },
    { client: 'Scratch Learn', title: 'Short Video 1', link: 'https://www.youtube.com/embed/lXWFcj6dhOs', thumbnail: 'https://img.youtube.com/vi/lXWFcj6dhOs/maxresdefault.jpg' },
    { client: 'Santu In UK', title: 'Short Video 2', link: 'https://www.youtube.com/embed/iJyzJXLGp9E', thumbnail: 'https://img.youtube.com/vi/iJyzJXLGp9E/maxresdefault.jpg' },
    { client: 'Santu In UK', title: 'Short Video 3', link: 'https://www.youtube.com/embed/SFpCJlJHPG8', thumbnail: 'https://img.youtube.com/vi/SFpCJlJHPG8/maxresdefault.jpg' },
    { client: 'Santu In UK', title: 'Short Video 4', link: 'https://www.youtube.com/embed/sRKKLyJdM1A', thumbnail: 'https://img.youtube.com/vi/sRKKLyJdM1A/maxresdefault.jpg' },
    { client: 'Spyka', title: 'Short Video 5', link: 'https://www.youtube.com/embed/KN5E0ZKDaUU', thumbnail: 'https://img.youtube.com/vi/KN5E0ZKDaUU/maxresdefault.jpg' },
    { client: 'InkCharts', title: 'Short Video 6', link: 'https://www.youtube.com/embed/GlXPyudoCFk', thumbnail: 'https://img.youtube.com/vi/GlXPyudoCFk/maxresdefault.jpg' },
    { client: 'InkCharts', title: 'Short Video 7', link: 'https://www.youtube.com/embed/vnhVPFN9KvY', thumbnail: 'https://img.youtube.com/vi/vnhVPFN9KvY/maxresdefault.jpg' },
    { client: 'InkCharts', title: 'Short Video 8', link: 'https://www.youtube.com/embed/GkCpfK1i06E', thumbnail: 'https://img.youtube.com/vi/GkCpfK1i06E/maxresdefault.jpg' },
    { client: 'Game Changer', title: 'Short Video 9', link: 'https://www.youtube.com/embed/65-eTqZ5ni4', thumbnail: 'https://img.youtube.com/vi/65-eTqZ5ni4/maxresdefault.jpg' },
    { client: 'Dr.Balaji', title: 'Short Video 10', link: 'https://www.youtube.com/embed/vkmUe7dujs8', thumbnail: 'https://img.youtube.com/vi/vkmUe7dujs8/maxresdefault.jpg' },
    { client: 'Spyka', title: 'Short Video 11', link: 'https://www.youtube.com/embed/L0l6SIIvRW0', thumbnail: 'https://img.youtube.com/vi/L0l6SIIvRW0/maxresdefault.jpg' },
    { client: 'Scratch Learn', title: 'Short Video 12', link: 'https://www.youtube.com/embed/eyej3zK_Fz0', thumbnail: 'https://img.youtube.com/vi/eyej3zK_Fz0/maxresdefault.jpg' },
];

const longFormVideosData = [
    { client: 'Santu UK', title: 'Long Video Intro', link: 'https://www.youtube.com/embed/Ijhy7m2sDeA', thumbnail: 'https://img.youtube.com/vi/Ijhy7m2sDeA/maxresdefault.jpg' },
    { client: 'Focas', title: 'Long Video', link: 'https://www.youtube.com/embed/5D31g4eMFbA', thumbnail: 'https://img.youtube.com/vi/5D31g4eMFbA/maxresdefault.jpg' },
    { client: 'Santu UK', title: 'Long Video 01', link: 'https://www.youtube.com/embed/gYVne66AaxE', thumbnail: 'https://img.youtube.com/vi/gYVne66AaxE/maxresdefault.jpg' },
    { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/9KICweMciK4', thumbnail: 'https://img.youtube.com/vi/9KICweMciK4/maxresdefault.jpg' },
    { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/_Cao_r2swWQ', thumbnail: 'https://img.youtube.com/vi/_Cao_r2swWQ/maxresdefault.jpg' },
    { client: 'Beardo', title: 'Long Video', link: 'https://www.youtube.com/embed/ta5uEqzhTBo', thumbnail: 'https://img.youtube.com/vi/ta5uEqzhTBo/maxresdefault.jpg' },
];

const motionDesignVideos = [
    { ...createMockVideo('Design Hub', 'Motion 01', true) },
    { ...createMockVideo('Creative Studio', 'Motion 02', true) },
    { ...createMockVideo('Brand X', 'Motion 03', true) },
    { ...createMockVideo('Tech Innovate', 'Motion 04', true) },
];

const shortFormContentVideos = [
    { ...shortFormVideosData[0], title: 'Short 01' },
    { ...shortFormVideosData[1], title: 'Short 02' },
    { ...shortFormVideosData[2], title: 'Short 03' },
    { ...shortFormVideosData[3], title: 'Short 04' },
    { ...shortFormVideosData[4], title: 'Short 05' },
    { ...shortFormVideosData[5], title: 'Short 06' },
    { ...shortFormVideosData[6], title: 'Short 07' },
    { ...shortFormVideosData[7], title: 'Short 08' },
];

const corporateProductVideos = [
    { ...longFormVideosData[0], title: 'Corporate 01' },
    { ...longFormVideosData[1], title: 'Corporate 02' },
    { ...longFormVideosData[2], title: 'Corporate 03' },
    { ...createMockVideo('Tech Startup', 'Corporate 04', false) },
];

const doctorVideos = [
    { ...shortFormVideosData[12], title: 'Doctor 01', client: 'Dr. Balaji' },
    { ...createMockVideo('Health Clinic', 'Doctor 02', true) },
    { ...createMockVideo('Pediatrician', 'Doctor 03', true) },
    { ...createMockVideo('Dental Care', 'Doctor 04', true) },
];

const youtubeVideos = [
    { ...longFormVideosData[3], title: 'YouTube 01' },
    { ...longFormVideosData[4], title: 'YouTube 02' },
    { ...longFormVideosData[5], title: 'YouTube 03' },
    { ...createMockVideo('Gaming Channel', 'YouTube 04', false) },
];

// --- Reusable Sub-Components ---

const VideoCard = ({ video, playingIndex, setPlayingIndex, id, isVertical }) => {
    const isPlaying = playingIndex === id;
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };
    const ratioClass = isVertical ? 'aspect-[9/16]' : 'aspect-video';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`relative group ${ratioClass} rounded-xl shadow-2xl overflow-hidden cursor-pointer bg-gray-800 transform hover:scale-[1.02] transition-transform duration-300`}
        >
            {isPlaying ? (
                <iframe
                    className="w-full h-full"
                    src={`${video.link}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <div onClick={() => setPlayingIndex(id)} className="w-full h-full">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/533x300/1f2937/FFFFFF?text=Video+Loading+Error'; }}
                    />
                    <div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4"
                    >
                        {/* REVERTED TO ICON */}
                        <FaRegPlayCircle className="text-white text-6xl mb-2 transform group-hover:scale-110 transition-transform" style={{ color: PRIMARY_COLOR }} />
                        <div className="text-white text-sm font-semibold text-center">{video.title}</div>
                        <div className="text-white text-xs italic">{video.client}</div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const VideoSection = ({ title, description, videos, isVertical }) => { 
    const [playingIndex, setPlayingIndex] = useState(null);
    const gridCols = isVertical ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3';

    return (
        <motion.section
            id={title.toLowerCase().replace(/\s/g, '-')}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="max-w-screen-xl mx-auto px-6 py-20"
        >
            {/* Centering the header group */}
            <div className="flex flex-col items-center text-center mb-6"> 
                <h5 className="text-primary text-3xl md:text-4xl font-extrabold font-serif tracking-wide text-center">
                    {title}
                </h5>
            </div>

            {/* Description is now centered */}
            <p className="text-center text-blue-300 italic text-md md:text-lg mb-12 max-w-2xl mx-auto"> 
                {description}
            </p>

            <div className={`grid grid-cols-2 gap-6 ${gridCols}`}>
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        id={`${title.toLowerCase().replace(/\s/g, '-')}-${index}`}
                        video={video}
                        playingIndex={playingIndex}
                        setPlayingIndex={setPlayingIndex}
                        isVertical={isVertical}
                    />
                ))}
            </div>
        </motion.section>
    );
};

// --- Main Component ---

export default function MoreWorks() {

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Styling to define primary and secondary colors */}
            <style jsx global>{`
                :root {
                    --color-primary: ${PRIMARY_COLOR};
                    --color-blue-300: ${SECONDARY_TEXT_COLOR};
                }
                .text-primary { color: var(--color-primary); }
                .hover\\:text-primary:hover { color: var(--color-primary); }
                .text-blue-300 { color: var(--color-blue-300); }
                
                /* Re-added Icon Sizing for the Play button icon */
                svg {
                    display: inline-block;
                    vertical-align: middle;
                }
                .text-6xl { width: 4.5rem; height: 4.5rem; }
            `}</style>

            {/* Client Works Section Header - Titles and Quote are Centered */}
            <motion.section
                id="moreworks-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-screen-xl mx-auto px-6 pt-20 pb-10"
            >
                {/* items-center to center the title group */}
                <div className="flex flex-col items-center">
                    {/* Title: Centered & Emoji removed */}
                   <h5 className="text-primary text-3xl md:text-5xl font-extrabold text-center pb-2 font-serif tracking-wide">
                        Client Works
                    </h5>
                    {/* Quote: Centered */}
                    <p className="text-center text-blue-300 italic text-md md:text-lg">
                        “Bringing stories to life, one frame at a time.”
                    </p>
                </div>
            </motion.section>

            {/* Stats Section - Centered */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-screen-xl mx-auto px-6 py-16"
            >
                {/* md:justify-center to center stats horizontally on desktop */}
                <div className="flex flex-col md:flex-row md:justify-center gap-12 sm:gap-16">
                    
                    {/* Stat 1: Videos Edited - items-center for centering */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={450} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-1">Videos Edited</p>
                    </div>

                    {/* Stat 2: Clients Worked With - items-center for centering */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={50} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-1">Clients Worked With</p>
                    </div>

                    {/* Stat 3: Years Experience - items-center for centering */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={3} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-1">Years Experience</p>
                    </div>
                </div>
            </motion.section>

            {/* --- 5 CATEGORIES --- */}
            <section id="works-content">

                <VideoSection
                    title="Motion Design Videos"
                    description="Dynamic animations and graphic storytelling for high-impact visual communication."
                    videos={motionDesignVideos}
                    isVertical={true}
                />

                <VideoSection
                    title="Short Form Content"
                    description="Captivating vertical videos optimized for Reels, TikTok, and Shorts platforms."
                    videos={shortFormContentVideos}
                    isVertical={true}
                />

                <VideoSection
                    title="Corporate/Product Videos"
                    description="Polished, professional content for marketing, training, and brand storytelling."
                    videos={corporateProductVideos}
                    isVertical={false}
                />

                <VideoSection
                    title="Doctor Videos"
                    description="Informative and engaging health content for medical professionals and clinics."
                    videos={doctorVideos}
                    isVertical={true}
                />

                <VideoSection
                    title="YouTube Videos"
                    description="High-quality, long-form content edited for optimal YouTube viewership and engagement."
                    videos={youtubeVideos}
                    isVertical={false}
                />
            </section>

            {/* Contact Section - Centered and icons/socials removed */}
            <motion.section
                id="contact"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="py-20 mt-10"
            >
                <div className="max-w-screen-xl mx-auto px-6">
                    {/* Centered container for the entire contact content */}
                    <div className="flex flex-col items-center text-center gap-12">
                        
                        {/* Title */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                                Let’s <br/> Work <br/> Together
                            </h3>
                            {/* Social links removed as requested */}
                        </div>

                        {/* Message and Contact Details */}
                        <div className="flex flex-col items-center">
                            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
                                Have a project in mind? Reach out and let’s bring your vision to life.
                            </p>

                            {/* Contact links stack vertically and centered */}
                            <div className="flex flex-col items-center gap-4">
                                <a
                                    href="mailto:vaigaivendhan138@gmail.com"
                                    className="text-white hover:text-primary transition"
                                >
                                    vaigaivendhan138@gmail.com
                                </a>
                                <a
                                    href="tel:+917604895101"
                                    className="text-white hover:text-primary transition"
                                >
                                    +91 7604895101
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
