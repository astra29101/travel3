import React, { useState } from 'react';
import { AddEditDestinationModal } from '../components/admin/AddEditDestinationModal';
import { AddEditPackageModal } from '../components/admin/AddEditPackageModal';
import { AddEditGuideModal } from '../components/admin/AddEditGuideModal';
import { useDestinations } from '../hooks/useDestinations';
import { usePackages } from '../hooks/usePackages';
import { useGuides } from '../hooks/useGuides';
import { Tables } from '../lib/supabase';
import { Pencil, Trash2, Plus } from 'lucide-react';

// Since we don't have direct access to shadcn/ui tabs, let's create a simple tabs implementation
const Tabs = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const TabsList = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex space-x-2 mb-6 border-b">{children}</div>;
};

const TabsTrigger = ({ value, children }: { value: string, children: React.ReactNode }) => {
  return (
    <button 
      className="px-4 py-2 text-gray-600 hover:text-gray-900 focus:outline-none border-b-2 border-transparent hover:border-gray-300 focus:border-cyan-600"
      value={value}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children }: { value: string, children: React.ReactNode }) => {
  return <div data-value={value}>{children}</div>;
};

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Tables['destinations'] | null>(null);
  const [editingPackage, setEditingPackage] = useState<Tables['packages'] | null>(null);
  const [editingGuide, setEditingGuide] = useState<Tables['guides'] | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('');
  
  const {
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    loading: loadingDestinations
  } = useDestinations();
  
  const {
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    loading: loadingPackages
  } = usePackages();
  
  const {
    guides,
    addGuide,
    updateGuide,
    deleteGuide,
    loading: loadingGuides
  } = useGuides();
  
  // Filter packages and guides based on selected destination
  const filteredPackages = selectedDestinationId
    ? packages.filter(pkg => pkg.destination_id === selectedDestinationId)
    : [];
    
  const filteredGuides = selectedDestinationId
    ? guides.filter(guide => guide.destination_id === selectedDestinationId)
    : [];
  
  const handleEditDestination = (destination: Tables['destinations']) => {
    setEditingDestination(destination);
    setIsDestinationModalOpen(true);
  };
  
  const handleEditPackage = (pkg: Tables['packages']) => {
    setEditingPackage(pkg);
    setIsPackageModalOpen(true);
  };
  
  const handleEditGuide = (guide: Tables['guides']) => {
    setEditingGuide(guide);
    setIsGuideModalOpen(true);
  };
  
  const handleSaveDestination = async (destination: Omit<Tables['destinations'], 'id' | 'created_at' | 'updated_at'>) => {
    if (editingDestination) {
      await updateDestination(editingDestination.id, destination);
    } else {
      await addDestination(destination);
    }
    setEditingDestination(null);
  };
  
  const handleSavePackage = async (pkg: Omit<Tables['packages'], 'id' | 'created_at' | 'updated_at'>) => {
    if (editingPackage) {
      await updatePackage(editingPackage.id, pkg);
    } else {
      await addPackage(pkg);
    }
    setEditingPackage(null);
  };
  
  const handleSaveGuide = async (guide: Omit<Tables['guides'], 'id' | 'created_at' | 'updated_at'>) => {
    if (editingGuide) {
      await updateGuide(editingGuide.id, guide);
    } else {
      await addGuide(guide);
    }
    setEditingGuide(null);
  };
  
  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs>
        <TabsList>
          <TabsTrigger 
            value="destinations"
            onClick={() => handleTabChange('destinations')}
          >
            Destinations
          </TabsTrigger>
          <TabsTrigger 
            value="packages"
            onClick={() => handleTabChange('packages')}
          >
            Packages
          </TabsTrigger>
          <TabsTrigger 
            value="guides"
            onClick={() => handleTabChange('guides')}
          >
            Guides
          </TabsTrigger>
        </TabsList>
        
        {/* Destinations Tab - Only shown when activeTab is "destinations" */}
        {activeTab === 'destinations' && (
          <TabsContent value="destinations">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Destinations</h2>
              <button
                onClick={() => {
                  setEditingDestination(null);
                  setIsDestinationModalOpen(true);
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Destination
              </button>
            </div>
            
            {loadingDestinations ? (
              <div className="text-center py-4">Loading destinations...</div>
            ) : destinations.length === 0 ? (
              <div className="text-center py-4">No destinations found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Category</th>
                      <th className="border px-4 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((destination) => (
                      <tr key={destination.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{destination.name}</td>
                        <td className="border px-4 py-2">{destination.category}</td>
                        <td className="border px-4 py-2 text-right">
                          <button
                            onClick={() => handleEditDestination(destination)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteDestination(destination.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        )}
        
        {/* Packages Tab - Only shown when activeTab is "packages" */}
        {activeTab === 'packages' && (
          <TabsContent value="packages">
            <div className="mb-6">
              <label className="block mb-2 font-medium">Select Destination:</label>
              <select
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
              >
                <option value="">-- Select a destination --</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedDestinationId && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Packages</h2>
                  <button
                    onClick={() => {
                      setEditingPackage(null);
                      setIsPackageModalOpen(true);
                    }}
                    disabled={!selectedDestinationId}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Package
                  </button>
                </div>
                
                {loadingPackages ? (
                  <div className="text-center py-4">Loading packages...</div>
                ) : filteredPackages.length === 0 ? (
                  <div className="text-center py-4">No packages found for this destination.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Title</th>
                          <th className="border px-4 py-2 text-left">Duration</th>
                          <th className="border px-4 py-2 text-left">Price</th>
                          <th className="border px-4 py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPackages.map((pkg) => (
                          <tr key={pkg.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{pkg.title}</td>
                            <td className="border px-4 py-2">{pkg.duration} days</td>
                            <td className="border px-4 py-2">${pkg.price}</td>
                            <td className="border px-4 py-2 text-right">
                              <button
                                onClick={() => handleEditPackage(pkg)}
                                className="text-blue-600 hover:text-blue-800 mr-2"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deletePackage(pkg.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        )}
        
        {/* Guides Tab - Only shown when activeTab is "guides" */}
        {activeTab === 'guides' && (
          <TabsContent value="guides">
            <div className="mb-6">
              <label className="block mb-2 font-medium">Select Destination:</label>
              <select
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-md"
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
              >
                <option value="">-- Select a destination --</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedDestinationId && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Guides</h2>
                  <button
                    onClick={() => {
                      setEditingGuide(null);
                      setIsGuideModalOpen(true);
                    }}
                    disabled={!selectedDestinationId}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Guide
                  </button>
                </div>
                
                {loadingGuides ? (
                  <div className="text-center py-4">Loading guides...</div>
                ) : filteredGuides.length === 0 ? (
                  <div className="text-center py-4">No guides found for this destination.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Name</th>
                          <th className="border px-4 py-2 text-left">Experience</th>
                          <th className="border px-4 py-2 text-left">Rate</th>
                          <th className="border px-4 py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuides.map((guide) => (
                          <tr key={guide.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{guide.name}</td>
                            <td className="border px-4 py-2">{guide.experience_years} years</td>
                            <td className="border px-4 py-2">${guide.price_per_day}/day</td>
                            <td className="border px-4 py-2 text-right">
                              <button
                                onClick={() => handleEditGuide(guide)}
                                className="text-blue-600 hover:text-blue-800 mr-2"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteGuide(guide.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        )}
      </Tabs>
      
      {isDestinationModalOpen && (
        <AddEditDestinationModal
          destination={editingDestination || undefined}
          onClose={() => {
            setIsDestinationModalOpen(false);
            setEditingDestination(null);
          }}
          onSave={handleSaveDestination}
        />
      )}
      
      {isPackageModalOpen && (
        <AddEditPackageModal
          package={editingPackage || undefined}
          destinationId={selectedDestinationId}
          onClose={() => {
            setIsPackageModalOpen(false);
            setEditingPackage(null);
          }}
          onSave={handleSavePackage}
        />
      )}
      
      {isGuideModalOpen && (
        <AddEditGuideModal
          guide={editingGuide || undefined}
          destinationId={selectedDestinationId}
          onClose={() => {
            setIsGuideModalOpen(false);
            setEditingGuide(null);
          }}
          onSave={handleSaveGuide}
        />
      )}
    </div>
  );
};

export default AdminPage;
