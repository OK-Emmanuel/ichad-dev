const LatestNews = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <a href="/news" className="text-primary hover:text-primary-dark">
            View All News →
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* News cards */}
        </div>
      </div>
    </section>
  );
}; 