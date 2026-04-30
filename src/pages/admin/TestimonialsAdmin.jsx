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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{testimonials.length} total reviews</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : testimonials.length === 0 ? (
        <div className="admin-card text-center py-16 text-gray-400">
          <Quote size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No testimonials yet</p>
          <p className="text-sm mt-1">Add your first customer review</p>
        </div>
      ) : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-3 font-semibold text-gray-500">Customer</th>
                <th className="pb-3 font-semibold text-gray-500">Review</th>
                <th className="pb-3 font-semibold text-gray-500">Rating</th>
                <th className="pb-3 font-semibold text-gray-500">Status</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-medium text-gray-900">{t.name}</div>
                    {t.location && <div className="text-gray-400 text-xs">{t.location}</div>}
                  </td>
                  <td className="py-3.5 pr-4 max-w-xs">
                    <p className="text-gray-600 line-clamp-2">"{t.review}"</p>
                  </td>
                  <td className="py-3.5 pr-4">
                    <StarRating rating={t.rating} />
                  </td>
                  <td className="py-3.5 pr-4">
                    <button onClick={() => toggleActive(t)} className="flex items-center gap-1.5 text-xs font-medium">
                      {t.is_active ? (
                        <><ToggleRight size={18} className="text-green-500" /><span className="text-green-600">Visible</span></>
                      ) : (
                        <><ToggleLeft size={18} className="text-gray-400" /><span className="text-gray-400">Hidden</span></>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
