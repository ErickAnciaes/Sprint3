import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ModalCancelamento({onCancel, variant}) {

  return (
    <Dialog>
      <form className="w-31 h-12">
        <DialogTrigger asChild>
          <Button variant={variant} size="wmax">Cancelar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancelar?</DialogTitle>
            <DialogDescription> 
              Você tem certeza que deseja cancelar? <br />
              Todas as alterações feitas serão perdidas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Continuar editando</Button>
            </DialogClose>
            <Button type="submit" onClick={onCancel}>Cancelar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
