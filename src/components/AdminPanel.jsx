
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, PlusCircle } from 'lucide-react';
import premiumAdsData from '@/data/premiumAds.json';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminPanel = () => {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);

  useEffect(() => {
    setAds(premiumAdsData);
  }, []);

  const handleEdit = (ad) => {
    setEditingAd({ ...ad });
  };

  const handleSave = () => {
    if (editingAd) {
      setAds(ads.map(ad => ad.id === editingAd.id ? editingAd : ad));
      setEditingAd(null);
      toast({ title: "Anuncio guardado", description: "El anuncio ha sido actualizado con éxito." });
    }
  };

  const handleCancel = () => {
    setEditingAd(null);
  };

  const handleDelete = (adId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
      setAds(ads.filter(ad => ad.id !== adId));
      toast({ title: "Anuncio eliminado", description: "El anuncio ha sido eliminado permanentemente." });
    }
  };

  const handleInputChange = (e, field) => {
    if (editingAd) {
      setEditingAd({ ...editingAd, [field]: e.target.value });
    }
  };

  const handleAddNew = () => {
    const newAd = {
      id: `ad-${Date.now()}`,
      title: "Nuevo Anuncio",
      description: "Descripción por defecto",
      cta: "Comprar ahora",
      image: "default-ad-image.jpg",
      sellerId: "new-seller"
    };
    setAds([newAd, ...ads]);
    handleEdit(newAd);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración de Anuncios</h1>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <PlusCircle size={20} />
            Añadir Anuncio
          </Button>
        </div>

        {editingAd && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Editando Anuncio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                value={editingAd.title}
                onChange={(e) => handleInputChange(e, 'title')}
                className="p-3 border rounded-md"
                placeholder="Título"
              />
              <input
                type="text"
                value={editingAd.description}
                onChange={(e) => handleInputChange(e, 'description')}
                className="p-3 border rounded-md"
                placeholder="Descripción"
              />
              <input
                type="text"
                value={editingAd.cta}
                onChange={(e) => handleInputChange(e, 'cta')}
                className="p-3 border rounded-md"
                placeholder="Llamada a la acción"
              />
              <input
                type="text"
                value={editingAd.image}
                onChange={(e) => handleInputChange(e, 'image')}
                className="p-3 border rounded-md"
                placeholder="URL de la imagen"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold">Título</th>
                <th className="p-4 font-semibold">Descripción</th>
                <th className="p-4 font-semibold">CTA</th>
                <th className="p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{ad.title}</td>
                  <td className="p-4 text-sm text-gray-600">{ad.description}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {ad.cta}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => alert(`Vista previa de: ${ad.title}`)}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(ad.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
