import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Local Icon Definitions (Replaced react-icons for a runnable, self-contained file) ---
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
const FaInstagram = ({ className = '' }) => (
    <Icon className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></Icon>
);
const FaLinkedin = ({ className = '' }) => (
    <Icon className={className}><path d="M16 8a4 4 0 0 1 4 4v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></Icon>
);
const FaEnvelope = ({ className = '' }) => (
    <Icon className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Icon>
);
const FaPhone = ({ className = '' }) => (
    <Icon className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.67-2.94 19.67 19.67 0 0 1-2.94-3.67A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72v4.29a1 1 0 0 1-.18.63l-1.92 1.92a1 1 0 0 0 0 1.41l3.59 3.59a1 1 0 0 0 1.41 0l1.92-1.92a1 1 0 0 1 .63-.18h4.29A2 2 0 0 1 22 16.92z" /></Icon>
);
const MdEdit = ({ className = '', style }) => (
    <Icon className={className} style={style}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></Icon>
);
const MdCorporateFare = ({ className = '', style }) => (
    <Icon className={className} style={style}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M12 7V3" /><path d="M6 7V3" /><path d="M18 7V3" /><path d="M12 21V17" /><path d="M6 21V17" /><path d="M18 21V17" /></Icon>
);
const MdHealthAndSafety = ({ className = '', style }) => (
    <Icon className={className} style={style}><path d="M12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8z" /><path d="M12 8v8" /><path d="M8 12h8" /></Icon>
);
const MdLibraryMusic = ({ className = '', style }) => (
    <Icon className={className} style={style}><path d="M8 18V8h7v10" /><circle cx="5" cy="18" r="3" /><circle cx="16" cy="18" r="3" /><path d="M15 13V5" /><path d="M18 13V5" /><rect width="4" height="12" x="15" y="5" rx="2" /></Icon>
);


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

const PRIMARY_COLOR = '#10B981'; // Tailwind 'emerald-500'
const SECONDARY_TEXT_COLOR = 'rgb(147 197 253)'; // blue-300 equivalent

// Mock helper to create placeholder videos with correct structure for missing data
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

// --- 1. Motion Design Videos (9:16 Vertical) ---
const motionDesignVideos = [
    { ...createMockVideo('Design Hub', 'Motion 01', true) },
    { ...createMockVideo('Creative Studio', 'Motion 02', true) },
    { ...createMockVideo('Brand X', 'Motion 03', true) },
    { ...createMockVideo('Tech Innovate', 'Motion 04', true) },
];

// --- 2. Short Form Content (9:16 Vertical) ---
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

// --- 3. Corporate/Product Videos (16:9 Horizontal) ---
const corporateProductVideos = [
    { ...longFormVideosData[0], title: 'Corporate 01' },
    { ...longFormVideosData[1], title: 'Corporate 02' },
    { ...longFormVideosData[2], title: 'Corporate 03' },
    { ...createMockVideo('Tech Startup', 'Corporate 04', false) },
];

// --- 4. Doctor Videos (9:16 Vertical) ---
const doctorVideos = [
    { ...shortFormVideosData[12], title: 'Doctor 01', client: 'Dr. Balaji' },
    { ...createMockVideo('Health Clinic', 'Doctor 02', true) },
    { ...createMockVideo('Pediatrician', 'Doctor 03', true) },
    { ...createMockVideo('Dental Care', 'Doctor 04', true) },
];

// --- 5. YouTube Videos (16:9 Horizontal) ---
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
                        // Fallback image in case the real link or mock link fails
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/533x300/1f2937/FFFFFF?text=Video+Loading+Error'; }}
                    />
                    <div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-4"
                    >
                        <FaRegPlayCircle className="text-white text-6xl mb-2 transform group-hover:scale-110 transition-transform" style={{ color: PRIMARY_COLOR }} />
                        <div className="text-white text-sm font-semibold text-center">{video.title}</div>
                        <div className="text-white text-xs italic">{video.client}</div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const VideoSection = ({ title, icon: Icon, description, videos, isVertical }) => {
    const [playingIndex, setPlayingIndex] = useState(null);
    // Grid configuration for responsiveness
    const gridCols = isVertical ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3';
    
    return (
        <motion.section
            id={title.toLowerCase().replace(/\s/g, '-')}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            // Increased py to ensure consistent spacing between sections
            className="max-w-screen-xl mx-auto px-6 py-20" 
        >
            <div className="flex flex-col items-center justify-center mb-4 text-center">
                <Icon className="text-4xl mb-2" style={{ color: PRIMARY_COLOR }} />
                <h5 className="text-white text-3xl md:text-4xl font-extrabold font-serif tracking-wide">
                    {title}
                </h5>
            </div>
            {/* Added max-w-2xl mx-auto to constrain description width on large screens for better readability */}
            <p className="text-center text-blue-300 italic text-md md:text-lg mb-10 max-w-2xl mx-auto">
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
             {/* Styling to define primary and secondary colors and icon sizes */}
            <style jsx global>{`
                :root {
                    --color-primary: ${PRIMARY_COLOR};
                    --color-blue-300: ${SECONDARY_TEXT_COLOR};
                }
                .text-primary { color: var(--color-primary); }
                .hover\\:text-primary:hover { color: var(--color-primary); }
                .text-blue-300 { color: var(--color-blue-300); }
                
                /* Icon Sizing for Tailwind utility classes - essential for responsiveness */
                svg {
                    display: inline-block;
                    vertical-align: middle;
                }
                .text-xl { width: 1.5rem; height: 1.5rem; }
                .text-2xl { width: 1.75rem; height: 1.75rem; }
                .text-3xl { width: 2.5rem; height: 2.5rem; }
                .text-4xl { width: 3rem; height: 3rem; }
                .text-5xl { width: 4rem; height: 4rem; }
                .text-6xl { width: 4.5rem; height: 4.5rem; }
            `}</style>
            
            {/* Client Works Section Header */}
            <motion.section
                id="moreworks-header"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                // Increased pt and added pb for better top and bottom separation
                className="max-w-screen-xl mx-auto px-6 pt-20 pb-10" 
            >
                {/* Primary text color applied here - ensures correct alignment */}
                <h5 className="text-primary text-3xl md:text-5xl font-extrabold text-center pb-2 font-serif tracking-wide">
                    Client Works 🎬
                </h5>
                <p className="text-center text-blue-300 italic text-md md:text-lg">
                    “Bringing stories to life, one frame at a time.”
                </p>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                // Adjusted py for better spacing
                className="max-w-screen-xl mx-auto px-6 py-16" 
            >
                {/* Responsive grid for stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={450} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-2">Videos Edited</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={50} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-2">Clients Worked With</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">
                            <CustomCountUp end={3} duration={3} suffix="+" />
                        </h3>
                        <p className="text-gray-300 mt-2">Years Experience</p>
                    </div>
                </div>
            </motion.section>

            {/* --- 5 CATEGORIES --- */}
            <section id="works-content">

                {/* 1. Motion Design Videos (9:16 Vertical) */}
                <VideoSection
                    title="Motion Design Videos"
                    icon={MdEdit}
                    description="Dynamic animations and graphic storytelling for high-impact visual communication."
                    videos={motionDesignVideos}
                    isVertical={true}
                />

                {/* 2. Short Form Content (9:16 Vertical) */}
                <VideoSection
                    title="Short Form Content"
                    icon={FaInstagram}
                    description="Captivating vertical videos optimized for Reels, TikTok, and Shorts platforms."
                    videos={shortFormContentVideos}
                    isVertical={true}
                />

                {/* 3. Corporate/Product Videos (16:9 Horizontal) */}
                <VideoSection
                    title="Corporate/Product Videos"
                    icon={MdCorporateFare}
                    description="Polished, professional content for marketing, training, and brand storytelling."
                    videos={corporateProductVideos}
                    isVertical={false}
                />

                {/* 4. Doctor Videos (9:16 Vertical) */}
                <VideoSection
                    title="Doctor Videos"
                    icon={MdHealthAndSafety}
                    description="Informative and engaging health content for medical professionals and clinics."
                    videos={doctorVideos}
                    isVertical={true}
                />

                {/* 5. YouTube Videos (16:9 Horizontal) */}
                <VideoSection
                    title="YouTube Videos"
                    icon={MdLibraryMusic}
                    description="High-quality, long-form content edited for optimal YouTube viewership and engagement."
                    videos={youtubeVideos}
                    isVertical={false}
                />
            </section>

            {/* Contact Section */}
            <motion.section
                id="contact"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                // Adjusted py for a strong final section spacing
                className="py-20 mt-10" 
            >
                <div className="max-w-screen-md mx-auto text-center px-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Let’s Work Together 🚀
                    </h3>
                    <p className="text-gray-300 mb-8">
                        Have a project in mind? Reach out and let’s bring your vision to
                        life.
                    </p>

                    {/* Responsive contact links */}
                    {/* Used justify-center to ensure alignment */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                        <a
                            href="mailto:vaigaivendhan138@gmail.com"
                            className="flex items-center gap-2 text-white hover:text-primary transition"
                        >
                            <FaEnvelope className="text-xl" /> vaigaivendhan138@gmail.com
                        </a>
                        <a
                            href="tel:+917604895101"
                            className="flex items-center gap-2 text-white hover:text-primary transition"
                        >
                            <FaPhone className="text-xl" /> +91 7604895101
                        </a>
                    </div>

                    <div className="flex justify-center gap-6 text-white text-2xl">
                        <a
                            href="https://instagram.com/imkv__"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-400 transition"
                        >
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a
                            href="http://linkedin.com/in/vaigai-vendhan-9b142b258"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition"
                        >
                            <FaLinkedin className="text-2xl" />
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
