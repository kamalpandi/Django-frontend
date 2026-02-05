import { useJsonExplorer } from '../hooks/useJsonExplorer';
import { InputPane } from '../components/InputPane';
import { ResultsPane } from '../components/ResultsPane';
import { Link } from 'react-router-dom';

export const ToolPage = () => {
    const {
        jsonInput,
        setJsonInput,
        error,
        path,
        summary,
        parsedData,
        handleAnalyze,
        handleCardClick,
        handleBreadcrumbClick,
        resetAll,
        loadJsonData
    } = useJsonExplorer();

    return (
        <div className="app-container">
            {/* Small Home Button in Top Left */}
            <Link to="/" className="home-button">
                ← Home
            </Link>

            <InputPane
                jsonInput={jsonInput}
                setJsonInput={setJsonInput}
                onAnalyze={handleAnalyze}
                onClear={resetAll}
                onLoadData={loadJsonData}
                error={error}
            />

            <ResultsPane
                summary={summary}
                path={path}
                onBreadcrumbClick={handleBreadcrumbClick}
                onCardClick={handleCardClick}
                hasData={!!parsedData}
            />
        </div>
    );
};