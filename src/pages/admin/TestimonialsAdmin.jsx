import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Quote } from 'lucide-react'
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from '../../hooks/useTestimonials'
import Modal         from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import StarRating    from '../../components/ui/StarRating'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import toast         from 'react-hot-toast'

export default function TestimonialsAdmin() {
  const { data: testimonials = [], isLoading } = useTestimonials({ adminAll: true })
  const create = useCreateTestimonial()
  const update = useUpdateTestimonial()
  const remove = useDeleteTestimonial()

  const [modalOpen,  setModalOpen]  = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteId,   setDeleteId]   = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm()

  const openCreate = () => {
    setEditTarget(null)
    reset({ name: '', review: '', rating: 5, location: '', is_active: true })
    setModalOpen(true)
  }

  const openEdit = (t) => {
    setEditTarget(t)
    reset({ name: t.name, review: t.review, rating: t.rating, location: t.location || '', is_active: t.is_active })
    setModalOpen(true)
  }

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      rating:    Number(data.rating),
      is_active: data.is_active === true || data.is_active === 'true',
    }
    if (editTarget) {
      await update.mutateAsync({ id: editTarget.id, ...payload })
    } else {
      await create.mutateAsync(payload)
    }
    setModalOpen(false)
    reset()
  }

  const toggleActive = (t) => update.mutateAsync({ id: t.id, is_active: !t.is_active })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-forest-800/5 pb-6 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest-800 tracking-wide">Testimonials</h1>
          <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-widest mt-2">
            {testimonials.length} client reviews currently managed
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid Card Layout */}
      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner /></div>
      ) : testimonials.length === 0 ? (
        <div className="admin-card text-center py-20 text-forest-800/40 border border-dashed border-forest-800/10">
          <Quote size={40} className="mx-auto mb-4 opacity-30 text-forest-600" />
          <p className="font-sans font-bold uppercase tracking-widest text-[11px]">No testimonials yet</p>
          <p className="text-xs text-forest-800/30 mt-1">Add your first customer review above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="admin-card p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans font-bold text-forest-800 text-sm">{t.name}</h3>
                    {t.location && <p className="text-forest-800/40 text-xs mt-0.5">{t.location}</p>}
                  </div>
                  <div className="flex-shrink-0">
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                
                <p className="text-forest-800/70 text-xs italic font-serif leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-forest-800/5 mt-4">
                <button onClick={() => toggleActive(t)} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300">
                  {t.is_active ? (
                    <><ToggleRight size={18} className="text-forest-800" /><span className="text-forest-800">Visible</span></>
                  ) : (
                    <><ToggleLeft size={18} className="text-forest-800/30" /><span className="text-forest-800/30">Hidden</span></>
                  )}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-2 rounded-xl text-forest-800/50 hover:text-forest-800 hover:bg-[#FAF8F5] border border-transparent hover:border-forest-800/5 transition-all duration-300 shadow-none hover:shadow-sm"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteId(t.id)}
                    className="p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-300 shadow-none hover:shadow-sm"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Customer Name *</label>
            <input className="input" placeholder="Ramesh Sharma" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Location (optional)</label>
            <input className="input" placeholder="Borivali West, Mumbai" {...register('location')} />
          </div>

          <div>
            <label className="label">Review *</label>
            <textarea
              className="input resize-none"
              rows={4}
              placeholder="What did the customer say?"
              {...register('review', { required: 'Review text is required' })}
            />
            {errors.review && <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>}
          </div>

          <div>
            <label className="label">Rating</label>
            <select className="input bg-white" {...register('rating')}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="is_active" {...register('is_active')} className="w-4 h-4 accent-amber-500" />
            <label htmlFor="is_active" className="text-sm text-gray-700 cursor-pointer">Show on website</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary justify-center">
              {isSubmitting ? 'Saving…' : editTarget ? 'Save Changes' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await remove.mutateAsync(deleteId); setDeleteId(null) }}
        loading={remove.isPending}
        title="Delete Testimonial"
        message="This review will be permanently removed from the website."
      />
    </div>
  )
}
