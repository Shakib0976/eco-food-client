import React from 'react';
import CountetCard from './ContetCard'

const Extra2 = () => {
    return (
        <div>
            <section className="bg-[#2bcee520] py-16 px-4 sm:px-8 lg:px-20">
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold dark:text-gray-200 text-gray-900 mb-4">
                        Our Community success stories
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Together, we're creating measurable change in our community. Every donation makes a difference in reducing waste and feeding families.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <CountetCard
                        icon={<span>💚</span>}
                        target={15234}
                        suffix=""
                        label="Meals Saved"
                        sublabel="From food waste"
                        color="green"
                    />
                    <CountetCard
                        icon={<span>🍃</span>}
                        target={8.5}
                        suffix=" tons"
                        label="CO₂ Reduced"
                        sublabel="Environmental impact"
                        color="orange"
                    />
                    <CountetCard
                        icon={<span>👥</span>}
                        target={1250}
                        suffix=""
                        label="People Fed"
                        sublabel="In our community"
                        color="blue"
                    />
                    <CountetCard
                        icon={<span>🏪</span>}
                        target={89}
                        suffix=""
                        label="Partner Restaurants"
                        sublabel="Active contributors"
                        color="green"
                    />
                    <CountetCard
                        icon={<span>📈</span>}
                        target={92}
                        suffix="%"
                        label="Success Rate"
                        sublabel="Donations completed"
                        color="orange"
                    />
                    <CountetCard
                        icon={<span>♻️</span>}
                        target={12.3}
                        suffix=" tons"
                        label="Food Rescued"
                        sublabel="This month alone"
                        color="blue"
                    />
                </div>

                {/* Extra success stories below (optional) */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <CountetCard
                        icon={<span>🍽️</span>}
                        target={37}
                        suffix=""
                        label="Success Stories"
                        sublabel="From local restaurants"
                        color="green"
                    />
                    <CountetCard
                        icon={<span>🤝</span>}
                        target={25}
                        suffix=""
                        label="Charity Collaborations"
                        sublabel="Proven partnerships"
                        color="blue"
                    />
                    <CountetCard
                        icon={<span>🌟</span>}
                        target={140}
                        suffix=""
                        label="Positive Testimonials"
                        sublabel="From volunteers & donors"
                        color="orange"
                    />
                </div>
            </section>
        </div>
    );
};

export default Extra2;