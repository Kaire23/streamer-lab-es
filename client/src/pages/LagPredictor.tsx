import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, XCircle, Zap, TrendingUp, Settings, Cpu, Monitor, Wifi } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface StreamConfig {
  resolution: string;
  fps: number;
  bitrate: number;
  encoder: string;
  cpuModel: string;
  gpuModel: string;
  ramGB: number;
  uploadSpeedMbps: number;
  currentCpuUsage: number;
  gameBeingStreamed?: string;
  obsVersion: string;
  operatingSystem: string;
}

interface LagPrediction {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  predictedIssues: string[];
  recommendations: string[];
  optimizedSettings: Partial<StreamConfig>;
  reasoning: string;
}

const LagPredictor: React.FC = () => {
  const [config, setConfig] = useState<StreamConfig>({
    resolution: '1920x1080',
    fps: 60,
    bitrate: 6000,
    encoder: 'x264',
    cpuModel: '',
    gpuModel: '',
    ramGB: 16,
    uploadSpeedMbps: 50,
    currentCpuUsage: 30,
    gameBeingStreamed: '',
    obsVersion: 'OBS Studio 30.0',
    operatingSystem: 'Windows 11'
  });

  const [prediction, setPrediction] = useState<LagPrediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedTips, setPersonalizedTips] = useState<string[]>([]);
  const [userGoals, setUserGoals] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof StreamConfig, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeLagRisk = async () => {
    if (!config.cpuModel || !config.gpuModel) {
      setError('Por favor completa la información de CPU y GPU para un análisis preciso');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-lag-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Error en el análisis');
      }

      const result: LagPrediction = await response.json();
      setPrediction(result);

      // Also get personalized tips
      if (userGoals.trim()) {
        const tipsResponse = await fetch('/api/get-personalized-tips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ streamConfig: config, userGoals }),
        });

        if (tipsResponse.ok) {
          const tipsResult = await tipsResponse.json();
          setPersonalizedTips(tipsResult.tips || []);
        }
      }

    } catch (err) {
      setError('Error al analizar la configuración. Inténtalo de nuevo.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'critical': return <XCircle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Predictor de Lag IA - Análisis Inteligente de Stream | Setups de Streamers</title>
        <meta name="description" content="Herramienta de inteligencia artificial que analiza tu configuración de streaming y predice problemas de lag antes de que ocurran. Obtén recomendaciones personalizadas para optimizar tu stream." />
        <meta name="keywords" content="predictor lag streaming, IA streaming, análisis stream, optimización OBS, predicción lag, herramientas streaming" />
        <link rel="canonical" href="https://yostreamer.com/herramientas/predictor-lag-ia" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Predictor de Lag IA
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Analiza tu configuración de streaming con inteligencia artificial y obtén predicciones precisas 
              sobre problemas de lag antes de que afecten tu stream.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuración de Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Settings */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Configuración de Video
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="resolution">Resolución</Label>
                      <Select value={config.resolution} onValueChange={(value: string) => handleInputChange('resolution', value)}>
                        <SelectTrigger data-testid="select-resolution">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1920x1080">1920x1080 (1080p)</SelectItem>
                          <SelectItem value="1280x720">1280x720 (720p)</SelectItem>
                          <SelectItem value="1600x900">1600x900 (900p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fps">FPS</Label>
                      <Select value={config.fps.toString()} onValueChange={(value: string) => handleInputChange('fps', parseInt(value))}>
                        <SelectTrigger data-testid="select-fps">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="60">60 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Encoding Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bitrate">Bitrate (kbps)</Label>
                    <Input
                      id="bitrate"
                      type="number"
                      value={config.bitrate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bitrate', parseInt(e.target.value) || 0)}
                      data-testid="input-bitrate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="encoder">Encoder</Label>
                    <Select value={config.encoder} onValueChange={(value: string) => handleInputChange('encoder', value)}>
                      <SelectTrigger data-testid="select-encoder">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="x264">x264 (Software)</SelectItem>
                        <SelectItem value="NVIDIA NVENC H.264">NVIDIA NVENC</SelectItem>
                        <SelectItem value="AMD AMF H.264">AMD AMF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Hardware Info */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Información de Hardware
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cpuModel">Modelo de CPU *</Label>
                      <Input
                        id="cpuModel"
                        placeholder="ej: Intel i7-12700K, AMD Ryzen 7 5800X"
                        value={config.cpuModel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('cpuModel', e.target.value)}
                        data-testid="input-cpu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gpuModel">Modelo de GPU *</Label>
                      <Input
                        id="gpuModel"
                        placeholder="ej: RTX 4070, GTX 1660, RX 6600 XT"
                        value={config.gpuModel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gpuModel', e.target.value)}
                        data-testid="input-gpu"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ramGB">RAM (GB)</Label>
                        <Select value={config.ramGB.toString()} onValueChange={(value: string) => handleInputChange('ramGB', parseInt(value))}>
                          <SelectTrigger data-testid="select-ram">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8">8 GB</SelectItem>
                            <SelectItem value="16">16 GB</SelectItem>
                            <SelectItem value="32">32 GB</SelectItem>
                            <SelectItem value="64">64 GB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cpuUsage">CPU Actual (%)</Label>
                        <Input
                          id="cpuUsage"
                          type="number"
                          min="0"
                          max="100"
                          value={config.currentCpuUsage}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('currentCpuUsage', parseInt(e.target.value) || 0)}
                          data-testid="input-cpu-usage"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Network & Other */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    Red y Otros
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="uploadSpeed">Velocidad de Subida (Mbps)</Label>
                      <Input
                        id="uploadSpeed"
                        type="number"
                        value={config.uploadSpeedMbps}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('uploadSpeedMbps', parseInt(e.target.value) || 0)}
                        data-testid="input-upload-speed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gameBeingStreamed">Juego (Opcional)</Label>
                      <Input
                        id="gameBeingStreamed"
                        placeholder="ej: Valorant, League of Legends, Just Chatting"
                        value={config.gameBeingStreamed}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gameBeingStreamed', e.target.value)}
                        data-testid="input-game"
                      />
                    </div>
                    <div>
                      <Label htmlFor="userGoals">Objetivos de Streaming (Opcional)</Label>
                      <Textarea
                        id="userGoals"
                        placeholder="ej: Quiero hacer stream de gaming competitivo sin lag, mejorar la calidad de imagen..."
                        value={userGoals}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserGoals(e.target.value)}
                        rows={3}
                        data-testid="textarea-goals"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={analyzeLagRisk} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? 'Analizando con IA...' : 'Analizar Riesgo de Lag'}
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {prediction && (
                <>
                  {/* Risk Assessment */}
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Análisis de Riesgo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center gap-3 p-4 rounded-lg border ${getRiskColor(prediction.riskLevel)}`}>
                        {getRiskIcon(prediction.riskLevel)}
                        <div>
                          <div className="font-semibold text-lg">
                            Riesgo de Lag: {prediction.riskLevel.toUpperCase()}
                          </div>
                          <div className="text-sm opacity-80">
                            Score: {prediction.riskScore}/100
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Análisis Detallado:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {prediction.reasoning}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Predicted Issues */}
                  {prediction.predictedIssues.length > 0 && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-orange-600">Problemas Potenciales</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {prediction.predictedIssues.map((issue, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recommendations */}
                  {prediction.recommendations.length > 0 && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-green-600">Recomendaciones</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {prediction.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Optimized Settings */}
                  {Object.keys(prediction.optimizedSettings).length > 0 && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-blue-600">Configuración Optimizada</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(prediction.optimizedSettings).map(([key, value]) => (
                            <div key={key} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                {key === 'resolution' ? 'Resolución' : 
                                 key === 'fps' ? 'FPS' :
                                 key === 'bitrate' ? 'Bitrate' :
                                 key === 'encoder' ? 'Encoder' : key}
                              </div>
                              <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                                {value}{key === 'bitrate' ? ' kbps' : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Personalized Tips */}
                  {personalizedTips.length > 0 && (
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-purple-600">Consejos Personalizados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {personalizedTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <Badge variant="outline" className="mt-0.5 text-xs">
                                {index + 1}
                              </Badge>
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {!prediction && !isAnalyzing && (
                <Card className="shadow-xl">
                  <CardContent className="text-center py-12">
                    <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      IA Lista para Analizar
                    </h3>
                    <p className="text-gray-500">
                      Completa tu configuración y obtén un análisis inteligente de tu setup de streaming
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LagPredictor;