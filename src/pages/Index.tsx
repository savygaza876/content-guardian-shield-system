
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Globe, Eye, BarChart3, Settings, Zap, Brain, Lock, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  id: string;
  url: string;
  platform: string;
  status: 'safe' | 'abusive' | 'sexual' | 'mixed';
  confidence: number;
  threats: string[];
  timestamp: Date;
  contentPreview: string;
}

interface BlocklistItem {
  id: string;
  url: string;
  platform: string;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  dateAdded: Date;
}

const ContentGuardianSystem = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [blocklist, setBlocklist] = useState<BlocklistItem[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 0,
    threatsBlocked: 0,
    safeContent: 0,
    accuracy: 94.7
  });
  const { toast } = useToast();

  // Mock AI analysis pipeline
  const analyzeContent = async (inputUrl: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate advanced AI processing stages
    const stages = [
      'Validating URL and extracting metadata...',
      'Scraping content using advanced libraries...',
      'Preprocessing content for AI analysis...',
      'Running abuse detection models...',
      'Analyzing sexual content patterns...',
      'Calculating threat confidence scores...',
      'Generating final assessment...'
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / stages.length) * 100);
      
      if (i === 3) {
        toast({
          title: "AI Model Processing",
          description: "Advanced neural networks analyzing content patterns...",
        });
      }
    }

    // Mock analysis result
    const platforms = ['Instagram', 'Twitter', 'Facebook', 'TikTok', 'YouTube'];
    const statuses: ('safe' | 'abusive' | 'sexual' | 'mixed')[] = ['safe', 'abusive', 'sexual', 'mixed'];
    const threats = [
      'Explicit sexual content detected',
      'Harassment and bullying language',
      'Violent imagery present',
      'Hate speech patterns',
      'Inappropriate minor content',
      'Cyberbullying indicators'
    ];

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomThreats = threats.slice(0, Math.floor(Math.random() * 3) + 1);
    
    const result: AnalysisResult = {
      id: Date.now().toString(),
      url: inputUrl,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      status: randomStatus,
      confidence: Math.floor(Math.random() * 30) + 70,
      threats: randomStatus === 'safe' ? [] : randomThreats,
      timestamp: new Date(),
      contentPreview: 'Content analysis completed using advanced ML models...'
    };

    setResults(prev => [result, ...prev]);
    
    // Add to blocklist if harmful
    if (result.status !== 'safe') {
      const blocklistItem: BlocklistItem = {
        id: result.id,
        url: inputUrl,
        platform: result.platform,
        reason: result.threats.join(', '),
        severity: result.confidence > 85 ? 'critical' : result.confidence > 70 ? 'high' : 'medium',
        dateAdded: new Date()
      };
      setBlocklist(prev => [blocklistItem, ...prev]);
      setStats(prev => ({ ...prev, threatsBlocked: prev.threatsBlocked + 1 }));
    } else {
      setStats(prev => ({ ...prev, safeContent: prev.safeContent + 1 }));
    }
    
    setStats(prev => ({ ...prev, totalScanned: prev.totalScanned + 1 }));
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid social media URL",
        variant: "destructive"
      });
      return;
    }
    analyzeContent(url);
    setUrl('');
  };

  const removeFromBlocklist = (id: string) => {
    setBlocklist(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Blocklist",
      description: "Item successfully removed from blocklist",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'abusive': return 'bg-red-100 text-red-800 border-red-200';
      case 'sexual': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'mixed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Content Guardian Shield</h1>
                <p className="text-sm text-slate-400">AI-Powered Social Media Content Moderation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                <Zap className="h-3 w-3 mr-1" />
                AI Active
              </Badge>
              <Settings className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* URL Input Section */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span>Content Analysis Input</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  type="url"
                  placeholder="Enter social media URL (Instagram, Twitter, Facebook, TikTok, etc.)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  disabled={isAnalyzing}
                />
                <Button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </div>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={analysisProgress} className="bg-slate-700" />
                  <p className="text-sm text-slate-400 text-center">
                    Processing with advanced AI models... {Math.round(analysisProgress)}%
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Scanned</p>
                  <p className="text-2xl font-bold text-white">{stats.totalScanned}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Threats Blocked</p>
                  <p className="text-2xl font-bold text-red-400">{stats.threatsBlocked}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Safe Content</p>
                  <p className="text-2xl font-bold text-green-400">{stats.safeContent}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">AI Accuracy</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.accuracy}%</p>
                </div>
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="results" className="data-[state=active]:bg-slate-700">
              Analysis Results
            </TabsTrigger>
            <TabsTrigger value="blocklist" className="data-[state=active]:bg-slate-700">
              Blocklist Management
            </TabsTrigger>
          </TabsList>

          {/* Analysis Results */}
          <TabsContent value="results">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No analysis results yet. Enter a URL above to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((result) => (
                      <div key={result.id} className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={`${getStatusColor(result.status)} border`}>
                                {result.status.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="border-slate-500 text-slate-300">
                                {result.platform}
                              </Badge>
                              <span className="text-sm text-slate-400">
                                Confidence: {result.confidence}%
                              </span>
                            </div>
                            <p className="text-white font-medium mb-2 break-all">{result.url}</p>
                            <p className="text-slate-400 text-sm">{result.contentPreview}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
                            {result.status !== 'safe' && (
                              <Lock className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </div>
                        
                        {result.threats.length > 0 && (
                          <Alert className="bg-red-900/20 border-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-red-300">
                              <strong>Threats Detected:</strong> {result.threats.join(', ')}
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
                          <span>Analyzed: {result.timestamp.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            {result.status === 'safe' ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocklist Management */}
          <TabsContent value="blocklist">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-red-400" />
                  <span>Blocklist Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {blocklist.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No blocked content yet. The system will automatically add harmful content here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blocklist.map((item) => (
                      <div key={item.id} className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-3 h-3 rounded-full ${getSeverityColor(item.severity)}`}></div>
                              <Badge variant="outline" className="border-slate-500 text-slate-300">
                                {item.platform}
                              </Badge>
                              <Badge className="bg-red-900 text-red-200 border-red-700">
                                {item.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-white font-medium mb-2 break-all">{item.url}</p>
                            <p className="text-slate-400 text-sm mb-2">{item.reason}</p>
                            <p className="text-xs text-slate-500">
                              Blocked: {item.dateAdded.toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromBlocklist(item.id)}
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentGuardianSystem;
