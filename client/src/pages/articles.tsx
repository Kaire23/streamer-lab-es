import { useState } from "react";
import { Link } from "wouter";
import { Clock, Calendar, User, Tag } from "lucide-react";
import { seoArticles } from "@/data/seo-articles";
import { Helmet } from "react-helmet-async";

const priorities = {
  high: "Alta Prioridad",
  medium: "Media Prioridad", 
  low: "Baja Prioridad"
};

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
};

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const categories = Array.from(new Set(seoArticles.map(article => article.category)));
  const filteredArticles = seoArticles.filter(article => {
    return (selectedCategory === "all" || article.category === selectedCategory) &&
           (selectedPriority === "all" || article.priority === selectedPriority);
  });

  return (
    <>
      <Helmet>
        <title>Guías de Streaming y Setup Gaming - Setups de Streamers</title>
        <meta name="description" content="Guías completas sobre equipamiento de streaming, configuración OBS, mejores micrófonos y webcams. Todo lo que necesitas para empezar en Twitch." />
        <meta name="keywords" content="guías streaming, setup gaming, OBS configuración, micrófono streaming, webcam Twitch" />
        <link rel="canonical" href="https://yostreamer.com/articles" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guías de Streaming Profesional
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Todo lo que necesitas saber sobre equipamiento, configuración y técnicas de streaming. 
              Desde setups básicos hasta configuraciones profesionales como las de Ibai, ElXokas y TheGrefg.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
                }`}
              >
                Todas las categorías
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPriority("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedPriority === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
              >
                Todas las prioridades
              </button>
              {Object.entries(priorities).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPriority(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedPriority === key
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`}>
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[article.priority]}`}>
                        {priorities[article.priority]}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readingTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {article.keywords.slice(0, 3).map((keyword) => (
                        <span key={keyword} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No se encontraron artículos con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}