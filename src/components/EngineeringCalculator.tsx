import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Zap, 
  Settings,
  History,
  BookOpen,
  Shield,
  TrendingUp,
  BarChart3,
  Database,
  Lightbulb,
  Crown
} from 'lucide-react';

// Material database with common engineering materials
const MATERIAL_DATABASE = [
  { name: 'Steel (A36)', youngsModulus: 200e9, yieldStrength: 250e6, color: '#374151' },
  { name: 'Aluminum 6061', youngsModulus: 68.9e9, yieldStrength: 276e6, color: '#60A5FA' },
  { name: 'Titanium', youngsModulus: 116e9, yieldStrength: 830e6, color: '#9CA3AF' },
  { name: 'Copper', youngsModulus: 110e9, yieldStrength: 70e6, color: '#B45309' },
  { name: 'Brass', youngsModulus: 102e9, yieldStrength: 200e6, color: '#F59E0B' },
  { name: 'Concrete', youngsModulus: 30e9, yieldStrength: 40e6, color: '#6B7280' },
  { name: 'Glass', youngsModulus: 70e9, yieldStrength: 50e6, color: '#BFDBFE' },
  { name: 'Carbon Fiber', youngsModulus: 150e9, yieldStrength: 600e6, color: '#1F2937' },
];

const EngineeringCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('stress');
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_DATABASE[0]);
  const [safetyFactor, setSafetyFactor] = useState(2.0);
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [units, setUnits] = useState({ force: 'N', length: 'm', area: 'm²', pressure: 'Pa' });

  const [values, setValues] = useState({
    force: '',
    area: '',
    deltaLength: '',
    originalLength: '',
    youngsModulus: '',
    stress: '',
    strain: '',
    pressure: '',
    shearStress: '',
    momentOfInertia: '',
    deflection: '',
    torque: '',
    polarMoment: '',
  });

  // Unit conversion factors
  const unitConversions = {
    force: { N: 1, kN: 1000, lbf: 4.44822 },
    length: { m: 1, mm: 0.001, cm: 0.01, in: 0.0254 },
    area: { 'm²': 1, 'mm²': 1e-6, 'cm²': 1e-4, 'in²': 0.00064516 },
    pressure: { Pa: 1, kPa: 1000, MPa: 1e6, psi: 6894.76 }
  };

  const convertValue = (value: number, fromUnit: string, toUnit: string, type: keyof typeof unitConversions) => {
    const baseValue = value / unitConversions[type][fromUnit as keyof typeof unitConversions[type]];
    return baseValue * unitConversions[type][toUnit as keyof typeof unitConversions[type]];
  };

  const calculateResults = () => {
    const force = parseFloat(values.force) || 0;
    const area = parseFloat(values.area) || 0;
    const deltaLength = parseFloat(values.deltaLength) || 0;
    const originalLength = parseFloat(values.originalLength) || 0;
    const torque = parseFloat(values.torque) || 0;
    const polarMoment = parseFloat(values.polarMoment) || 0;

    let stress = 0, strain = 0, pressure = 0, shearStress = 0, youngsModulus = 0;

    // Stress calculation
    if (force && area) {
      stress = force / area;
      pressure = force / area;
    }

    // Strain calculation
    if (deltaLength && originalLength) {
      strain = deltaLength / originalLength;
    }

    // Young's Modulus calculation
    if (stress && strain && strain !== 0) {
      youngsModulus = stress / strain;
    } else if (selectedMaterial) {
      youngsModulus = selectedMaterial.youngsModulus;
    }

    // Shear stress from torque
    if (torque && polarMoment) {
      shearStress = (torque * (polarMoment / 2)) / polarMoment;
    }

    const results = {
      stress: stress.toFixed(2),
      strain: strain.toFixed(6),
      pressure: pressure.toFixed(2),
      shearStress: shearStress.toFixed(2),
      youngsModulus: youngsModulus.toFixed(2),
    };

    setValues(prev => ({ ...prev, ...results }));

    // Save to history
    const historyEntry = {
      timestamp: new Date().toISOString(),
      inputs: { force, area, deltaLength, originalLength },
      results,
      material: selectedMaterial.name
    };
    setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const resetCalculator = () => {
    setValues({
      force: '',
      area: '',
      deltaLength: '',
      originalLength: '',
      youngsModulus: '',
      stress: '',
      strain: '',
      pressure: '',
      shearStress: '',
      momentOfInertia: '',
      deflection: '',
      torque: '',
      polarMoment: '',
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const getSafetyStatus = () => {
    const stress = parseFloat(values.stress) || 0;
    const yieldStrength = selectedMaterial.yieldStrength / safetyFactor;
    
    if (stress === 0) return { status: 'unknown', color: 'gray', message: 'No stress calculated' };
    if (stress > selectedMaterial.yieldStrength) {
      return { status: 'critical', color: 'red', message: 'Yield strength exceeded!' };
    } else if (stress > yieldStrength) {
      return { status: 'warning', color: 'yellow', message: 'Approaching yield strength' };
    } else {
      return { status: 'safe', color: 'green', message: 'Within safe limits' };
    }
  };

  const generateReport = () => {
    const safety = getSafetyStatus();
    const report = `PREMIUM ENGINEERING ANALYSIS REPORT
Generated by Viswa M's Premium Engineering Calculator
Portfolio: https://viswam-portfolio.com

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Report ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}

=== MATERIAL SPECIFICATION ===
Selected Material: ${selectedMaterial.name}
Young's Modulus: ${selectedMaterial.youngsModulus.toExponential(2)} Pa
Yield Strength: ${selectedMaterial.yieldStrength.toExponential(2)} Pa
Safety Factor: ${safetyFactor}

=== INPUT PARAMETERS ===
Force Applied: ${values.force} ${units.force}
Cross-sectional Area: ${values.area} ${units.area}
Change in Length: ${values.deltaLength} ${units.length}
Original Length: ${values.originalLength} ${units.length}

=== CALCULATED RESULTS ===
Stress (σ): ${values.stress} Pa
Strain (ε): ${values.strain}
Young's Modulus (E): ${values.youngsModulus} Pa
Pressure: ${values.pressure} Pa
Shear Stress: ${values.shearStress} Pa

=== SAFETY ANALYSIS ===
Status: ${safety.status.toUpperCase()}
Maximum Allowable Stress: ${(selectedMaterial.yieldStrength / safetyFactor).toExponential(2)} Pa
Actual Stress: ${values.stress || '0'} Pa
Margin: ${values.stress ? ((selectedMaterial.yieldStrength / safetyFactor) / parseFloat(values.stress)).toFixed(2) : 'N/A'}
Recommendation: ${safety.message}

=== ADVANCED ANALYSIS ===
Material Utilization: ${values.stress ? ((parseFloat(values.stress) / selectedMaterial.yieldStrength) * 100).toFixed(1) : '0'}%
Stiffness Rating: ${values.youngsModulus ? (parseFloat(values.youngsModulus) > 150e9 ? 'High' : parseFloat(values.youngsModulus) > 70e9 ? 'Medium' : 'Low') : 'N/A'}

=== ENGINEERING INSIGHTS ===
${values.strain && Math.abs(parseFloat(values.strain)) > 0.002 ? '• Significant deformation detected - consider reinforcement' : '• Deformation within acceptable limits'}
${safety.status === 'critical' ? '• CRITICAL: Design modification required immediately' : safety.status === 'warning' ? '• WARNING: Consider increasing safety factor or material upgrade' : '• Design appears structurally sound'}

This report was generated using premium engineering analysis tools.
For professional engineering consultation, visit: https://viswam-portfolio.com/consulting
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `premium-engineering-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculatorVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Premium Floating Calculator Button */}
      <motion.div 
        className="fixed bottom-20 left-4 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Crown className="w-5 h-5 text-white" />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity"
            whileHover={{ scale: 1.2 }}
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Premium Calculator Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Premium Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Premium Calculator Panel */}
            <motion.div
              variants={calculatorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:w-[480px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-2 border-amber-500/40 rounded-3xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
            >
              {/* Premium Header */}
              <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md p-4 border-b border-amber-500/30 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Premium Engineering Suite</h3>
                        <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-xs font-bold text-white">
                          PRO
                        </span>
                      </div>
                      <p className="text-xs text-amber-200">Advanced Mechanical Analysis & Design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setShowHistory(!showHistory)}
                      className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <History className="w-4 h-4 text-amber-400" />
                    </motion.button>
                    <motion.button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Settings className="w-4 h-4 text-amber-400" />
                    </motion.button>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Material Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800/50 p-3 rounded-xl border border-amber-500/20"
                >
                  <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Database className="w-4 h-4" />
                    Material Database
                  </h4>
                  <select
                    value={selectedMaterial.name}
                    onChange={(e) => setSelectedMaterial(MATERIAL_DATABASE.find(m => m.name === e.target.value) || MATERIAL_DATABASE[0])}
                    className="w-full bg-gray-700 border border-amber-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {MATERIAL_DATABASE.map(material => (
                      <option key={material.name} value={material.name}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div className="text-gray-300">
                      E: {(selectedMaterial.youngsModulus / 1e9).toFixed(0)} GPa
                    </div>
                    <div className="text-gray-300">
                      σ_y: {(selectedMaterial.yieldStrength / 1e6).toFixed(0)} MPa
                    </div>
                  </div>
                </motion.div>

                {/* Safety Factor */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-gray-800/50 p-3 rounded-xl border border-amber-500/20"
                >
                  <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4" />
                    Safety Factor: {safetyFactor}
                  </h4>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={safetyFactor}
                    onChange={(e) => setSafetyFactor(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </motion.div>

                {/* Stress Analysis Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="flex justify-between items-center cursor-pointer p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl hover:from-purple-900/40 hover:to-blue-900/40 transition-all border border-purple-500/20"
                    onClick={() => toggleSection('stress')}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-purple-300 font-semibold flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      Stress Analysis (σ = F/A)
                    </h4>
                    <motion.div
                      animate={{ rotate: expandedSection === 'stress' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedSection === 'stress' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-3 mt-3 overflow-hidden"
                      >
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">Force ({units.force})</label>
                          <input
                            type="number"
                            name="force"
                            value={values.force}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Enter force"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">Area ({units.area})</label>
                          <input
                            type="number"
                            name="area"
                            value={values.area}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Enter area"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Strain Analysis Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <motion.div
                    className="flex justify-between items-center cursor-pointer p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl hover:from-blue-900/40 hover:to-cyan-900/40 transition-all border border-blue-500/20"
                    onClick={() => toggleSection('strain')}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-blue-300 font-semibold flex items-center gap-2 text-sm">
                      <BarChart3 className="w-4 h-4" />
                      Strain Analysis (ε = ΔL/L)
                    </h4>
                    <motion.div
                      animate={{ rotate: expandedSection === 'strain' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedSection === 'strain' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-3 mt-3 overflow-hidden"
                      >
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">ΔL ({units.length})</label>
                          <input
                            type="number"
                            name="deltaLength"
                            value={values.deltaLength}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Change in length"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">L ({units.length})</label>
                          <input
                            type="number"
                            name="originalLength"
                            value={values.originalLength}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Original length"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Safety Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-3 rounded-xl border-2"
                  style={{ 
                    borderColor: getSafetyStatus().color === 'red' ? '#EF4444' : 
                               getSafetyStatus().color === 'yellow' ? '#F59E0B' : 
                               getSafetyStatus().color === 'green' ? '#10B981' : '#6B7280',
                    background: getSafetyStatus().color === 'red' ? 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 100%)' :
                               getSafetyStatus().color === 'yellow' ? 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.05) 100%)' :
                               getSafetyStatus().color === 'green' ? 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)' :
                               'linear-gradient(135deg, rgba(107,114,128,0.1) 0%, rgba(107,114,128,0.05) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" style={{ color: getSafetyStatus().color === 'red' ? '#EF4444' : 
                                 getSafetyStatus().color === 'yellow' ? '#F59E0B' : 
                                 getSafetyStatus().color === 'green' ? '#10B981' : '#6B7280' }} />
                      <span className="font-semibold text-sm" style={{ 
                        color: getSafetyStatus().color === 'red' ? '#EF4444' : 
                               getSafetyStatus().color === 'yellow' ? '#F59E0B' : 
                               getSafetyStatus().color === 'green' ? '#10B981' : '#6B7280' 
                      }}>
                        {getSafetyStatus().message}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Factor: {safetyFactor}
                    </div>
                  </div>
                </motion.div>

                {/* Results Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 p-4 rounded-xl border-2 border-amber-500/30"
                >
                  <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4" />
                    Analysis Results
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Stress (Pa)', value: values.stress, color: 'purple', icon: 'σ' },
                      { label: 'Strain', value: values.strain, color: 'blue', icon: 'ε' },
                      { label: "Young's Modulus (Pa)", value: values.youngsModulus, color: 'green', icon: 'E' },
                      { label: 'Pressure (Pa)', value: values.pressure, color: 'cyan', icon: 'P' },
                      { label: 'Shear Stress (Pa)', value: values.shearStress, color: 'orange', icon: 'τ' },
                      { label: 'Utilization (%)', 
                        value: values.stress ? ((parseFloat(values.stress) / selectedMaterial.yieldStrength) * 100).toFixed(1) : '0', 
                        color: 'amber', 
                        icon: 'U' 
                      },
                    ].map((result, index) => (
                      <div key={result.label} className="relative">
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          <span className="text-amber-200 font-mono mr-1">{result.icon}</span>
                          {result.label}
                        </label>
                        <input
                          type="text"
                          value={result.value}
                          readOnly
                          className={`w-full bg-gray-800 border border-${result.color}-500/40 rounded-lg px-3 py-2 text-sm text-${result.color}-300 font-mono backdrop-blur-sm`}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={calculateResults}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-bold flex items-center justify-center gap-2 text-sm shadow-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap className="w-4 h-4" />
                    Calculate Analysis
                  </motion.button>
                  
                  <motion.button
                    onClick={resetCalculator}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset All
                  </motion.button>
                  
                  <motion.button
                    onClick={generateReport}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 px-4 rounded-xl transition-all duration-300 font-bold text-sm shadow-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Export Report
                  </motion.button>
                </div>

                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center pt-2"
                >
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-xs font-bold text-white shadow-lg">
                    <Crown className="w-3 h-3" />
                    PREMIUM ENGINEERING SUITE
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EngineeringCalculator;
